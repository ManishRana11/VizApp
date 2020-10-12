import axios from 'axios';
import CognitensorAsyncStorageService from '../asyncstorage/CognitensorAsyncStorageService';
import { CLIENT_USER_URL } from '../../constants';

class CognitensorEndpoints {
  api = async ({ url, method, dispathReducer }) => {
    const token = CognitensorAsyncStorageService.getUserToken();
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
      .then((data) => {
        if (data.data.status === 'success') {
          dispathReducer();
        }
      })
      .catch((e) => console.warn(e));
  };

  login = async (email, password, dispathReducer) => {
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
          dispathReducer({
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

  signOut = async (dispathReducer) => {
    await CognitensorAsyncStorageService.removeUserToken();
    dispathReducer({ type: 'SIGN_OUT' });
  };

  getUserDetails = async (dispathReducer) => {
    this.api({
      url: `${CLIENT_USER_URL}/auth/user/data`,
      method: 'get',
      dispathReducer,
    });
  };

  getDashboardList = async (dispathReducer) => {
    this.api({
      url: `${CLIENT_USER_URL}/cogniviz/dashboard/titles`,
      method: 'get',
      dispathReducer,
    });
  };
}

export default new CognitensorEndpoints();
