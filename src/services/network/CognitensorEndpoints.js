import axios from 'axios';
import CognitensorAsyncStorageService from '../asyncstorage/CognitensorAsyncStorageService';
import { CLIENT_USER_URL } from '../../constants';

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
  // handleQueryProcess = (flag) => {
  //   const {
  //     dbType, dbConnectionString, dbCaching, pypuffFile, development, token,
  //   } = this.context;
  //   const {
  //     componentprops: { pypuff, newQuery }, changing, filtervaluer: filterValueR,
  //     filtervaluenr: filterValueNR,
  //   } = this.props;

  //   // Options to send request for data
  //   const options = {
  //     method: 'post',
  //     // Check if running query or python file
  //     url: `${CLIENT_USER_URL}/cogniviz/query/execute`,
  //     data: {
  //       query: newQuery,
  //       dbType,
  //       dbConnectionString,
  //       dbCaching,
  //       pypuffFile,
  //       developmentFile: development,
  //       gammaFile: false,
  //       filterValue: filterValueR,
  //       filterValueNR,
  //       childObject: {},
  //     },
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${token || window.localStorage.authToken}`,
  //     },
  //   };

  //   // If requesting or mounting send request.
  //   if (changing === 2 || flag === 1) this.sendRequest(options);
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
  getDashboard = async ({ dispatchReducer }) => {
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
