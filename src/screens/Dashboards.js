import React, { useEffect, useReducer } from 'react';
import { Text, StyleSheet } from 'react-native';
import { apiStateReducer } from '../reducers/ApiStateReducer';
import CognitensorEndpoints from '../services/network/CognitensorEndpoints';
import DefaultScrollView from '../components/default/DefaultScrollView';

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
    <DefaultScrollView
      styleView={styles.container}
      styleScroll={styles.scrollContainer}>
      <Text>Dashboards</Text>
      {dashboards.isError && <Text>Error</Text>}
      {dashboards.isLoading ? (
        <Text>Loading...</Text>
      ) : (
        dashboards.data.message.map((item, index) => {
          return (
            <Text key={index}>{item.dashboardTitle || item.dashboardName}</Text>
          );
        })
      )}
    </DefaultScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Dashboards;
