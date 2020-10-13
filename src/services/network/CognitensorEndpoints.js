import axios from 'axios';
import CognitensorAsyncStorageService from '../asyncstorage/CognitensorAsyncStorageService';
import { CLIENT_USER_URL } from '../../constants';

class CognitensorEndpoints {
  api = async ({ url, method, dispatchReducer }) => {
    dispatchReducer({ type: 'API_FETCH_INIT' });
    const token = await CognitensorAsyncStorageService.getUserToken();
    const reqConfig = {
      method,
      url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    // TODO: Check if device is online
    axios(reqConfig)
      .then((result) => {
        if (result.status === 200) {
          dispatchReducer({
            type: 'API_FETCH_SUCCESS',
            payload: result.data,
          });
        }
      })
      .catch((e) => {
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

  getDashboardList = async ({ dispatchReducer }) => {
    await this.api({
      url: `${CLIENT_USER_URL}/cogniviz/dashboard/titles`,
      method: 'get',
      dispatchReducer,
    });
  };
}

export default new CognitensorEndpoints();
