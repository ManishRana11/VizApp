import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  DashboardStackNavigator,
  AccountStackNavigator,
  NotificationStackNavigator,
} from './StackNavigation';

const Tab = createBottomTabNavigator();

const MainBottomNavigator = () => {
  const HomeScreenName = 'Home';
  const AccountScreenName = 'Account';
  const NotificationScreenName = 'Notifications';

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === HomeScreenName) {
            iconName = 'home';
          } else if (route.name === AccountScreenName) {
            iconName = 'account-circle';
          } else if (route.name === NotificationScreenName) {
            iconName = 'bell';
          }
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        headerShown: true,
      })}>
      <Tab.Screen name={HomeScreenName} component={DashboardStackNavigator} />
      <Tab.Screen name={AccountScreenName} component={AccountStackNavigator} />
      <Tab.Screen
        name={NotificationScreenName}
        component={NotificationStackNavigator}
      />
    </Tab.Navigator>
  );
};

export { MainBottomNavigator };
