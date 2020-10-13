import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboards from '../screens/Dashboards';
import Account from '../screens/Account';
import Notification from '../screens/Notification';

const Stack = createStackNavigator();

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
  DashboardStackNavigator,
  AccountStackNavigator,
  NotificationStackNavigator,
};
