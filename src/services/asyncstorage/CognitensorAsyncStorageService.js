import AsyncStorage from '@react-native-community/async-storage';

class CognitensorAsyncStorageService {
  USER_TOKEN_KEY = 'USER_TOKEN';

  setUserToken = async (token) => {
    try {
      await AsyncStorage.setItem(this.USER_TOKEN_KEY, token);
    } catch (e) {
      console.warn('StorageClient: Failed to set user token');
    }
  };

  getUserToken = async () => {
    let userToken;
    try {
      userToken = await AsyncStorage.getItem(this.USER_TOKEN_KEY);
    } catch (e) {
      console.warn('StorageClient: Failed to get user token');
    }
    return userToken;
  };

  removeUserToken = async () => {
    try {
      await AsyncStorage.removeItem(this.USER_TOKEN_KEY);
    } catch (e) {
      console.warn('StorageClient: Failed to remove user token');
    }
  };
}

export default new CognitensorAsyncStorageService();
