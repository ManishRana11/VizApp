import React, { useState, useEffect, useReducer } from 'react';
import { Text, FlatList, ActivityIndicator } from 'react-native';
import { apiStateReducer } from '../reducers/ApiStateReducer';
import CognitensorEndpoints from '../services/network/CognitensorEndpoints';
import DefaultView from '../components/default/DefaultView';
import DashboardHeader from '../components/DashboardHeader';
import DashboardListCard from '../components/DashboardListCard';
import DashboardGridCard from '../components/DashboardGridCard';
import { theme } from '../theme';

const Dashboards = ({ navigation }) => {
  const [dashboards, dispatchDashboards] = useReducer(apiStateReducer, {
    data: [],
    isLoading: true,
    isError: false,
  });
  const [gridView, setGridView] = useState(false);

  const toggleGridView = () => {
    setGridView(!gridView);
  };

  useEffect(() => {
    CognitensorEndpoints.getDashboardList({
      dispatchReducer: dispatchDashboards,
    });
  }, []);

  return (
    <DefaultView>
      <DashboardHeader
        title="My Dashboards"
        grid={gridView}
        changeView={() => toggleGridView()}
      />
      {dashboards.isError && <Text>Error</Text>}
      {dashboards.isLoading ? (
        <ActivityIndicator size="small" color={theme.colors.primary} />
      ) : (
        <FlatList
          key={gridView ? 1 : 0}
          numColumns={gridView ? 2 : 1}
          data={dashboards.data.message}
          renderItem={
            gridView
              ? ({ item, index }) => (
                  <DashboardGridCard
                    item={item}
                    index={index}
                    onPress={() =>
                      navigation.navigate('Dashboard Detail', {
                        name: item.dashboardTitle || item.dashboardName,
                      })
                    }
                  />
                )
              : ({ item, index }) => (
                  <DashboardListCard
                    item={item}
                    index={index}
                    onPress={() =>
                      navigation.navigate('Dashboard Detail', {
                        name: item.dashboardTitle || item.dashboardName,
                      })
                    }
                  />
                )
          }
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </DefaultView>
  );
};

export default Dashboards;
