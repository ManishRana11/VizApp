import React from 'react';
import TopTab from '../navigation/TopTabNavigation';
import TabDashboardDetail from './TabDashboardDetail';
import data from '../dummyData.json';

const DashboardDetail = () => {
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
