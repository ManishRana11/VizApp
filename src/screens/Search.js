import React, { useState, useEffect, useReducer } from 'react';
import {
  Text,
  FlatList,
  ActivityIndicator,
  View,
  StyleSheet,
  Keyboard,
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import { apiStateReducer } from '../reducers/ApiStateReducer';
import CognitensorEndpoints from '../services/network/CognitensorEndpoints';
import DefaultView from '../components/default/DefaultView';
import DashboardListCard from '../components/DashboardListCard';
import { theme } from '../theme';

const Search = ({ navigation }) => {
  const [dashboards, dispatchDashboards] = useReducer(apiStateReducer, {
    data: [],
    isLoading: true,
    isError: false,
  });
  const [searchVisible, setSearchVisible] = useState(false);
  const [filtered, setFiltered] = useState();

  const toggleSearchVisibility = () => {
    setSearchVisible(!searchVisible);
    navigation.pop();
  };

  const onChangeSearch = (value) => {
    if (value === '') {
      setFiltered(dashboards.data.message);
    }

    const messages = dashboards.data.message.filter((item) => {
      const title = item.dashboardTitle || item.dashboardName;
      return title.toLowerCase().startsWith(value.toLowerCase());
    });
    setFiltered(messages);
  };

  useEffect(() => {
    CognitensorEndpoints.getDashboardList({
      dispatchReducer: dispatchDashboards,
    });
  }, []);

  return (
    <DefaultView>
      <View style={styles.header}>
        <Searchbar
          placeholder="Search"
          icon="close"
          onChangeText={onChangeSearch}
          onIconPress={toggleSearchVisibility}
        />
      </View>
      {dashboards.isError && <Text>Error</Text>}
      {dashboards.isLoading ? (
        <ActivityIndicator size="small" color={theme.colors.primary} />
      ) : (
        <FlatList
          keyboardShouldPersistTaps={'handled'}
          key={0}
          numColumns={1}
          data={filtered}
          renderItem={({ item, index }) => (
            <DashboardListCard
              item={item}
              index={index}
              onPress={() => {
                Keyboard.dismiss();
                navigation.navigate('Dashboard Detail', {
                  name: item.dashboardTitle || item.dashboardName,
                });
              }}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </DefaultView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFF',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    height: 60,
    flexDirection: 'row',
    padding: theme.spacing.small,
  },
});

export default Search;
