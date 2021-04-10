import React, { useReducer, useEffect } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import TopTab from '../navigation/TopTabNavigation';
import TabDashboardDetail from './TabDashboardDetail';
import { apkStateReducer } from '../reducers/ApkStateReducer';
import CognitensorEndpoints from '../services/network/CognitensorEndpoints';
import data from '../dummy/dummyData';
import DefaultView from '../components/default/DefaultView';
import { theme } from '../theme';

const DashboardDetail = () => {
  const [dashboardsData, dispatchDashboardsData] = useReducer(apkStateReducer, {
    data: [],
    isLoading: true,
    isError: false,
  });

  useEffect(() => {
    console.log('dashboard_detail');
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
        </TopTab.Navigator>
      )}
    </DefaultView>
  );
};

export default DashboardDetail;
