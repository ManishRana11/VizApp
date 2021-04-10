import axios from 'axios';
import CognitensorAsyncStorageService from '../asyncstorage/CognitensorAsyncStorageService';
import { CLIENT_USER_URL } from '../../constants';

class CognitensorEndpoints {
  token = '';
  //---------------------------------------------Dashboard_Data---------------------------------------------
  apk = ({ url, method, dispatchReducer }) => {
    dispatchReducer({ type: 'API_FETCH_DATA_INIT' });
    console.log('apk_hit');
    console.log('apk_token', this.token);
    const dashConfig = {
      method,
      url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
    };

    // TODO: Check if device is online
    axios(dashConfig)
      .then((dash) => {
        console.log('dashconfig', dashConfig);
        console.log('dash', dash);
        if (dash.status === 200) {
          dispatchReducer({
            type: 'API_FETCH_DATA_SUCCESS',
            payload: dash.data,
          });
        }
      })
      .catch((errr) => {
        console.log(errr);
        dispatchReducer({ type: 'API_FETCH_DATA_FAILURE' });
        console.warn(errr);
      });
  };
  //---------------------------------------------------------------------------------------------------------------

  api = async ({ url, method, dispatchReducer }) => {
    dispatchReducer({ type: 'API_FETCH_INIT' });
    console.log('api_hit');
    this.token = await CognitensorAsyncStorageService.getUserToken();
    console.log('api_token', this.token);
    const reqConfig = {
      method,
      url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
    };

    // TODO: Check if device is online
    axios(reqConfig)
      .then((result) => {
        console.log('reqConfig', reqConfig);
        console.log('result', result);
        if (result.status === 200) {
          dispatchReducer({
            type: 'API_FETCH_SUCCESS',
            payload: result.data,
          });
        }
      })
      .catch((e) => {
        console.log(e);
        dispatchReducer({ type: 'API_FETCH_FAILURE' });
        console.warn(e);
      });
  };

  login = async (email, password, dispatchReducer) => {
    axios({
      method: 'post',
      url: `${CLIENT_USER_URL}/auth/login`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        email: email.toLowerCase().trim(),
        password: password,
      }),
    })
      .then(async (response) => {
        if (response.data.token) {
          await CognitensorAsyncStorageService.setUserToken(
            response.data.token,
          );
          dispatchReducer({
            type: 'SIGN_IN',
            token: response.data.token,
            user: response.data.user,
          });
        }
        if (response.statusText === 'error') {
          console.log(response);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  signOut = async (dispatchReducer) => {
    await CognitensorAsyncStorageService.removeUserToken();
    dispatchReducer({ type: 'SIGN_OUT' });
  };

  getUserDetails = async ({ dispatchReducer }) => {
    await this.api({
      url: `${CLIENT_USER_URL}/auth/user/data`,
      method: 'get',
      dispatchReducer,
    });
  };

  //-------------------------------------------------dashboard_api-------------------------------------------------
  getDashboard = async ({ dispatchReducer }) => {
    console.log('getDashboard');
    await this.apk({
      url: `${CLIENT_USER_URL}/cogniviz/get/dashboardconfig/rr`,
      method: 'get',
      dispatchReducer,
    });
  };
  //---------------------------------------------------------------------------------------------------------------

  getDashboardList = async ({ dispatchReducer }) => {
    console.log('getDashboardList');
    await this.api({
      url: `${CLIENT_USER_URL}/cogniviz/dashboard/titles`,
      method: 'get',
      dispatchReducer,
    });
  };
}

export default new CognitensorEndpoints();
