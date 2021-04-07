import React, { useEffect, useReducer } from 'react';
import TopTab from '../navigation/TopTabNavigation';
import TabDashboardDetail from './TabDashboardDetail';
import { apkStateReducer } from '../reducers/ApkStateReducer';
import CognitensorEndpoints from '../services/network/CognitensorEndpoints';
import data from '../dummyData.json';

const DashboardDetail = () => {
  const [dashboardsData, dispatchDashboardsData] = useReducer(apkStateReducer, {
    data: [],
    isLoading: true,
    isError: false,
  });

  useEffect(() => {
    console.log('sdfgh');
    CognitensorEndpoints.getDashboard({
      dispatchReducer: dispatchDashboardsData,
    });
  }, []);

  return (
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
  );
};

export default DashboardDetail;
