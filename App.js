import 'react-native-gesture-handler';
import React, { useMemo, useReducer, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

import { MainStackNavigator } from './src/navigation/StackNavigation';
import { authReducer } from './src/reducers/AuthReducer';
import { AuthContext } from './src/context/auth.js';
import { CLIENT_USER_URL } from './constants';

const App = () => {
  const [authState, dispathAuthState] = useReducer(authReducer, {
    isLoading: true,
    isSignout: false,
    userToken: null,
    user: null,
  });
  const authContext = useMemo(
    () => ({
      signIn: async (loginData) => {
        // get token from server
        axios({
          method: 'post',
          url: `${CLIENT_USER_URL}/auth/login`,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          data: JSON.stringify({
            email: loginData.email.toLowerCase().trim(),
            password: loginData.password,
          }),
        })
          .then(async (response) => {
            if (response.data.token) {
              await AsyncStorage.setItem('userToken', response.data.token);
              await AsyncStorage.setItem(
                'userObject',
                JSON.stringify(response.data.user),
              );
              dispathAuthState({
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
      },
      signOut: async () => {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userObject');
        dispathAuthState({ type: 'SIGN_OUT' });
      },
    }),
    [],
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken, userObject;

      try {
        userToken = await AsyncStorage.getItem('userToken');
        userObject = await AsyncStorage.getItem('userObject');
      } catch (e) {
        // Restoring Token Failed
        console.log(e);
      }

      dispathAuthState({
        type: 'RESTORE_TOKEN',
        token: userToken,
        user: JSON.parse(userObject),
      });
    };
    bootstrapAsync();
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <MainStackNavigator authState={authState} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
