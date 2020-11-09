import React, { useState, useEffect, useReducer } from 'react';
import {
  Text,
  FlatList,
  ActivityIndicator,
  View,
  StyleSheet,
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

  const toggleSearchVisibility = () => {
    setSearchVisible(!searchVisible);
    navigation.pop();
  };

  const onChangeSearch = (value) => {
    console.log(value);
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
          key={0}
          numColumns={1}
          data={dashboards.data.message}
          renderItem={DashboardListCard}
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
