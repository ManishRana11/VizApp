import 'react-native-gesture-handler';
import React, { useMemo, useReducer, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MainStackNavigator } from './src/navigation/MainStackNavigation';
import CognitensorEndpoints from './src/services/network/CognitensorEndpoints';
import CognitensorAsyncStorageService from './src/services/asyncstorage/CognitensorAsyncStorageService';
import { authReducer } from './src/reducers/AuthReducer';
import { AuthContext } from './src/context/auth.js';

const App = () => {
  const [authState, dispathAuthState] = useReducer(authReducer, {
    isLoading: true,
    isSignout: false,
    userToken: null,
  });
  const authContext = useMemo(
    () => ({
      signIn: async (loginData) =>
        await CognitensorEndpoints.login(
          loginData.email,
          loginData.password,
          dispathAuthState,
        ),
      signOut: async () => await CognitensorEndpoints.signOut(dispathAuthState),
    }),
    [],
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      userToken = await CognitensorAsyncStorageService.getUserToken();

      dispathAuthState({
        type: 'RESTORE_TOKEN',
        token: userToken,
      });
    };
    bootstrapAsync();
  }, []);

  return (
    <AuthContext.Provider value={{ ...authContext, ...authState }}>
      <NavigationContainer>
        <MainStackNavigator authState={authState} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
