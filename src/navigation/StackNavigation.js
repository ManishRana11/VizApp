import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboards from '../screens/Dashboards';
import Search from '../screens/Search';
import Account from '../screens/account/Account';
import DashboardActivities from '../screens/account/DashboardActivities';
import Feedback from '../screens/account/Feedback';
import Support from '../screens/account/Support';
import Settings from '../screens/account/Settings';
import Notification from '../screens/Notification';
import AppHeader from '../components/AppHeader';
import DashboardDetail from '../screens/DashboardDetail';
import CardStructure from '../screens/CardStructure';

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
            searchIconVisible={true}
          />
        ),
      }}>
      <Stack.Screen name="Home" component={Dashboards} />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Dashboard Detail"
        component={DashboardDetail}
        options={({ route }) => ({ title: route.params.name })}
      />
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
      <Stack.Screen
        name="Dashboard Activities"
        component={DashboardActivities}
      />
      <Stack.Screen name="Feedback" component={Feedback} />
      <Stack.Screen name="Support" component={Support} />
      <Stack.Screen name="Settings" component={Settings} />
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
