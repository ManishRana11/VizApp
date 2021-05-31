import React, { useReducer, useEffect } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import CognitensorEndpoints from '../services/network/CognitensorEndpoints';
import { apkStateReducer } from '../reducers/ApkStateReducer';
import DefaultView from '../components/default/DefaultView';
import { theme } from '../theme';
import TopTab from '../navigation/TopTabNavigation';
import TabDashboardDetail from './TabDashboardDetail';
import axios from 'axios';
import CLIENT_USER_URL from '../constants';
import CLIENT_TEXT360_URL from '../constants';
import CognitensorAsyncStorageService from '../services/asyncstorage/CognitensorAsyncStorageService';

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
  console.log('data fetched', chart);

  const dbType = chart.dbType;
  console.log('dbType', dbType);

  const dbConnectionString = chart.dbConnectionString;
  console.log('dbConnectionString', dbConnectionString);

  const pypuffFile = chart.dashboardConfig.pypuffFile;
  console.log('pypuffFile', pypuffFile);

  const dbCaching = chart.dashboardConfig.dbCaching;
  console.log('dbCaching', dbCaching);

  // const tabs = chart.dashboardConfig.tabsConfig.map((item) => {
  //   return item.name;
  // });
  // console.log('tabs', tabs);

  // const components = chart.dashboardConfig.tabsConfig.map((item) => {
  //   return item.components;
  // });
  // console.log('components', components);

  // const qury = components[0].map((query) => {
  //   return query.query;
  // });
  // console.log('query', qury);

  //---------------------------------------Execute Query-----------------------------------------------
  const execute = async (dispatchReducer) => {
    const token = await CognitensorAsyncStorageService.getUserToken();
    axios({
      method: 'post',
      url: `${
        pypuffFile ? CLIENT_TEXT360_URL : CLIENT_USER_URL
      }/cogniviz/query/execute`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: {
        dbType,
        dbConnectionString,
        pypuffFile,
        dbCaching,
        gammaFile: false,
        childObject: {},
      },
    })
      .then(async (database) => {
        console.log('database', database);
      })
      .catch((eror1) => {
        console.log('eror1', eror1);
        dispatchReducer({ type: 'EXECUTE_FETCH_FAILURE' });
        console.warn('warn1', eror1);
      });
  };
  console.log('execute', execute);
  //---------------------------------------------------------------------------------------------------

  return (
    <DefaultView>
      <Text>Chart Data</Text>
    </DefaultView>
  );
};

export default CardStructure;
