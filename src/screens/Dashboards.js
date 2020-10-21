import React, { useEffect, useReducer } from 'react';
import { Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { apiStateReducer } from '../reducers/ApiStateReducer';
import CognitensorEndpoints from '../services/network/CognitensorEndpoints';
import DefaultView from '../components/default/DefaultView';
import DashboardHeader from '../components/DashboardHeader';
import DashboardListCard from '../components/DashboardListCard';
import { theme } from '../theme';

const Dashboards = () => {
  const [dashboards, dispatchDashboards] = useReducer(apiStateReducer, {
    data: [],
    isLoading: true,
    isError: false,
  });

  useEffect(() => {
    CognitensorEndpoints.getDashboardList({
      dispatchReducer: dispatchDashboards,
    });
  }, []);

  return (
    <DefaultView>
      <DashboardHeader title="My Dashboards" />
      {dashboards.isError && <Text>Error</Text>}
      {dashboards.isLoading ? (
        <ActivityIndicator size="small" color={theme.colors.primary} />
      ) : (
        <FlatList
          data={dashboards.data.message}
          renderItem={DashboardListCard}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </DefaultView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Dashboards;
