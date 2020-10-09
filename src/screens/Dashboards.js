import React from 'react';
import { Text, StyleSheet } from 'react-native';
import DefaultScrollView from '../components/default/DefaultScrollView';

const Dashboards = () => {
  return (
    <DefaultScrollView
      styleView={styles.container}
      styleScroll={styles.scrollContainer}>
      <Text>Dashboards</Text>
    </DefaultScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Dashboards;
