import React, { useEffect, useReducer } from 'react';
import { Text, ActivityIndicator } from 'react-native';
import TopTab from '../navigation/TopTabNavigation';
import TabDashboardDetail from './TabDashboardDetail';
import { apkStateReducer } from '../reducers/ApiStateReducer';
import CognitensorEndpoints from '../services/network/CognitensorEndpoints';
import data from '../dummyData.json';
import { theme } from '../theme';

const DashboardDetail = () => {
  const [dashboardsData, dispatchDashboardsData] = useReducer(apkStateReducer, {
    dashData: [],
    isLoading: true,
    isError: false,
  });

  useEffect(() => {
    CognitensorEndpoints.getDashboard({
      dispatchDashboards: dispatchDashboardsData,
    });
  }, []);
  return (
    <TopTab.Navigator
      tabBarOptions={{
        scrollEnabled: true,
      }}>
      {dashboardsData.isError && <Text>Error</Text>}
      {dashboardsData.isLoading ? (
        <ActivityIndicator size="small" color={theme.colors.primary} />
      ) : (
        <>
          {data.tabsConfig.map((item) => {
            return (
              <TopTab.Screen
                key={item.name}
                name={item.name}
                component={TabDashboardDetail}
                initialParams={{
                  tabsConfig: item,
                }}
              />
            );
          })}
        </>
      )}
    </TopTab.Navigator>
  );
};

export default DashboardDetail;
