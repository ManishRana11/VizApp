import React, { useReducer, useEffect } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import CognitensorEndpoints from '../services/network/CognitensorEndpoints';
import { apkStateReducer } from '../reducers/ApkStateReducer';
import DefaultView from '../components/default/DefaultView';
import { theme } from '../theme';
import TopTab from '../navigation/TopTabNavigation';
import TabDashboardDetail from './TabDashboardDetail';

const CardStructure = ({ navigation, route }) => {
  const [chart, dispatchchart] = useReducer(apkStateReducer, {
    dashboardConfig: {},
    isLoading: true,
    isError: false,
  });

  useEffect(() => {
    CognitensorEndpoints.getDashboard({
      dispatchReducer: dispatchchart,
    });
  }, []);
  console.log(chart, 'happy');
  const dbType = chart.dbType;
  console.log('dbType', dbType);
  const dbConnectionString = chart.dbConnectionString;
  console.log('dbConnectionString', dbConnectionString);

  return (
    <DefaultView>
      <Text>Chart Data</Text>
    </DefaultView>
  );
};

export default CardStructure;
