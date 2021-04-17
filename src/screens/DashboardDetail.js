import React, { useReducer, useEffect } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import TopTab from '../navigation/TopTabNavigation';
import TabDashboardDetail from './TabDashboardDetail';
import { apkStateReducer } from '../reducers/ApkStateReducer';
import CognitensorEndpoints from '../services/network/CognitensorEndpoints';
import DefaultView from '../components/default/DefaultView';
import { theme } from '../theme';

const DashboardDetail = () => {
  const [dashboardsData, dispatchDashboardsData] = useReducer(apkStateReducer, {
    dashboardConfig: {},
    isLoading: true,
    isError: false,
  });

  useEffect(() => {
    CognitensorEndpoints.getDashboard({
      dispatchReducer: dispatchDashboardsData,
    });
  }, []);

  return (
    <DefaultView>
      {dashboardsData.isError && <Text>Error</Text>}
      {dashboardsData.isLoading ? (
        <ActivityIndicator size="small" color={theme.colors.primary} />
      ) : (
        <TopTab.Navigator
          tabBarOptions={{
            scrollEnabled: true,
          }}>
          {dashboardsData.dashboardConfig.tabsConfig.map((item) => {
            console.log(dashboardsData);
            return (
              <TopTab.Screen
                key={JSON.stringify(item.name)}
                name={JSON.stringify(item.name)}
                component={TabDashboardDetail}
                initialParams={{
                  tabsConfig: item,
                }}
              />
            );
          })}
        </TopTab.Navigator>
      )}
    </DefaultView>
  );
};

export default DashboardDetail;
