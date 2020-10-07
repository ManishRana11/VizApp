import 'react-native-gesture-handler';
import React, { useMemo, useReducer, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { MainStackNavigator } from './src/navigation/StackNavigation';
import { authReducer } from './src/reducers/AuthReducer';
import { AuthContext } from './src/context/auth.js';
import { CLIENT_USER_URL } from './constants';

const App = () => {
  const [authState, dispathAuthState] = useReducer(authReducer, {
    isLoading: true,
    isSignout: false,
    userToken: null,
  });
  const authContext = useMemo(
    () => ({
      signIn: async (loginData) => {
        // get token from server
        fetch(`${CLIENT_USER_URL}/auth/login`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: loginData.email.toLowerCase().trim(),
            password: loginData.password,
          }),
        })
          .then((response) => response.json())
          .then(async (data) => {
            if (data.token) {
              await AsyncStorage.setItem('userToken', data.token);
              dispathAuthState({ type: 'SIGN_IN', token: data.token });
            }
            if (data.status === 'error') {
              console.log(data);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      },
      signOut: () => dispathAuthState({ type: 'SIGN_OUT' }),
    }),
    [],
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring Token Failed
        console.log(e);
      }

      dispathAuthState({ type: 'RESTORE_TOKEN', token: userToken });
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
