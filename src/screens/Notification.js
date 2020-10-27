import React from 'react';
import { StyleSheet } from 'react-native';
import DefaultScrollView from '../components/default/DefaultScrollView';
import NotificationCard from '../components/NotificationCard';

const Notification = () => {
  return (
    <DefaultScrollView
      styleView={styles.container}
      styleScroll={styles.scrollContainer}>
      <NotificationCard
        heading="New Dashboard"
        avatar="N"
        body="A new dashboard ‘Akshita’ was added to your wall."
        color="#3EB6EF"
      />
      <NotificationCard
        heading="New Dashboard"
        avatar="N"
        body="A new dashboard ‘Akshita’ was added to your wall."
        color="#E95280"
      />
      <NotificationCard
        heading="New Dashboard"
        avatar="N"
        body="A new dashboard ‘Akshita’ was added to your wall."
        color="#A1C45A"
      />
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
