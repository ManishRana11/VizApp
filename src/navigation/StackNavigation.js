import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MainBottomNavigator } from '../navigation/BottomNavigation';
import Login from '../screens/Login';
import Splash from '../screens/Splash';

const Stack = createStackNavigator();

const MainStackNavigator = ({ authState }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {authState.isLoading ? (
        <Stack.Screen name="Splash" component={Splash} />
      ) : authState.userToken == null ? (
        <Stack.Screen name="Login" component={Login} />
      ) : (
        <Stack.Screen name="Home" component={MainBottomNavigator} />
      )}
    </Stack.Navigator>
  );
};

export { MainStackNavigator };
