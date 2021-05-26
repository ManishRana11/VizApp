import React, { useReducer, useEffect } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import CognitensorEndpoints from '../services/network/CognitensorEndpoints';
import { apkStateReducer } from '../reducers/ApkStateReducer';
import DefaultView from '../components/default/DefaultView';
import { theme } from '../theme';

const CardStructure = () => {
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
  console.log(chart);

  return (
    <DefaultView>
      
    </DefaultView>
  );
};

export default CardStructure;
