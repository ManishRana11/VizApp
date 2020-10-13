import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { theme } from '../theme';

const DashboardHeader = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerFont}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: theme.spacing.small,
  },
  headerFont: {
    ...theme.typography.header,
  },
});

export default DashboardHeader;
