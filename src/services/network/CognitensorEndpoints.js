import axios from 'axios';
import CognitensorAsyncStorageService from '../asyncstorage/CognitensorAsyncStorageService';
import { CLIENT_USER_URL } from '../../constants';
import { dashboardName } from '../../screens/Dashboards';

class CognitensorEndpoints {
  token = '';
  //---------------------------------------------Dashboard_Data---------------------------------------------
  apk = ({ url, method, dispatchReducer }) => {
    dispatchReducer({ type: 'API_FETCH_DATA_INIT' });
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
        if (dash.status === 200) {
          const dashdata = dash?.data?.message;
          dispatchReducer({
            type: 'API_FETCH_DATA_SUCCESS',
            payload: dashdata,
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
    this.token = await CognitensorAsyncStorageService.getUserToken();
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
        console.log(result);
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
  //---------------------------------------Execute Query-----------------------------------------------
  // execute = async (dbType, dispatchReducer) => {
  //   axios({
  //     method: 'post',
  //     url: `${CLIENT_USER_URL}/cogniviz/query/execute`,
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     data: JSON.stringify({
  //       dbType,
  //     }),
  //   })
  //     .then(async (database) => {
  //       console.log(database);
  //       if (database.status === 200) {
  //         dispatchReducer({
  //           type: 'API_FETCH_EXECUTE_SUCCESS',
  //           payload: database.data,
  //         });
  //       }
  //     })
  //     .catch((eror) => {
  //       console.log(eror);
  //       dispatchReducer({ type: 'API_FETCH_EXECUTE_FAILURE' });
  //       console.warn(eror);
  //     });
  // };
  //---------------------------------------------------------------------------------------------------
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
        console.log(response);
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
  getDashboard = async ({ dashboardName, dispatchReducer }) => {
    await this.apk({
      url: `${CLIENT_USER_URL}/cogniviz/get/dashboardconfig/disaster_analysis_mumbai`,
      method: 'get',
      dispatchReducer,
    });
  };
  //---------------------------------------------------------------------------------------------------------------

  getDashboardList = async ({ dispatchReducer }) => {
    await this.api({
      url: `${CLIENT_USER_URL}/cogniviz/dashboard/titles`,
      method: 'get',
      dispatchReducer,
    });
  };
}

export default new CognitensorEndpoints();
