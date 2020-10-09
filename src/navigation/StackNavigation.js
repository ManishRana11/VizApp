import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MainBottomNavigator } from '../navigation/BottomNavigation';
import Login from '../screens/Login';
import Splash from '../screens/Splash';
import Dashboards from '../screens/Dashboards';
import Account from '../screens/Account';
import Notification from '../screens/Notification';

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

const DashboardStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Dashboards} />
    </Stack.Navigator>
  );
};

const AccountStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Account" component={Account} />
    </Stack.Navigator>
  );
};

const NotificationStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Notifications" component={Notification} />
    </Stack.Navigator>
  );
};

export {
  MainStackNavigator,
  DashboardStackNavigator,
  AccountStackNavigator,
  NotificationStackNavigator,
};
