import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Dashboards from '../screens/Dashboards';
import Account from '../screens/Account';
import Notification from '../screens/Notification';

const Tab = createBottomTabNavigator();

const MainBottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Dashboards') {
            iconName = 'home';
          } else if (route.name === 'Account') {
            iconName = 'account-circle';
          } else if (route.name === 'Notifications') {
            iconName = 'bell';
          }
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
      })}>
      <Tab.Screen name="Dashboards" component={Dashboards} />
      <Tab.Screen name="Account" component={Account} />
      <Tab.Screen name="Notifications" component={Notification} />
    </Tab.Navigator>
  );
};

export { MainBottomNavigator };
