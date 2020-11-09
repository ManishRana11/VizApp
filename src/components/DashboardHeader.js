import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../theme';

const DashboardHeader = ({ title, grid, changeView }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerFont}>{title}</Text>
      <TouchableOpacity onPress={changeView}>
        <MaterialIcons name={grid ? 'grid-off' : 'grid-on'} size={24} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: theme.spacing.small,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerFont: {
    ...theme.typography.header,
  },
});

export default DashboardHeader;
