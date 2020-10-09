import React from 'react';
import { Text, StyleSheet } from 'react-native';
import DefaultScrollView from '../components/default/DefaultScrollView';

const Notification = () => {
  return (
    <DefaultScrollView
      styleView={styles.container}
      styleScroll={styles.scrollContainer}>
      <Text>Notification</Text>
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

export default Notification;
