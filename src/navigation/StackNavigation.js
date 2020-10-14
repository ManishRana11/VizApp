import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboards from '../screens/Dashboards';
import Account from '../screens/Account';
import Notification from '../screens/Notification';
import AppHeader from '../components/AppHeader';

const Stack = createStackNavigator();

const DashboardStackNavigator = () => {
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <AppHeader
            scene={scene}
            previous={previous}
            navigation={navigation}
            searchVisible={true}
          />
        ),
      }}>
      <Stack.Screen name="Home" component={Dashboards} />
    </Stack.Navigator>
  );
};

const AccountStackNavigator = () => {
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <AppHeader
            scene={scene}
            previous={previous}
            navigation={navigation}
          />
        ),
      }}>
      <Stack.Screen name="Account" component={Account} />
    </Stack.Navigator>
  );
};

const NotificationStackNavigator = () => {
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <AppHeader
            scene={scene}
            previous={previous}
            navigation={navigation}
          />
        ),
      }}>
      <Stack.Screen name="Notifications" component={Notification} />
    </Stack.Navigator>
  );
};

export {
  DashboardStackNavigator,
  AccountStackNavigator,
  NotificationStackNavigator,
};
