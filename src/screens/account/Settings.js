import React, { useState } from 'react';
import { Text, Switch, StyleSheet, View } from 'react-native';
import DefaultView from '../../components/default/DefaultView';
import { theme } from '../../theme';

const Settings = () => {
  const [notification, setNotification] = useState(false);

  const toggleNotification = () => {
    setNotification(!notification);
  };

  return (
    <DefaultView>
      <View style={styles.item}>
        <Text style={styles.itemText}>Notifications</Text>
        <Switch value={notification} onValueChange={toggleNotification} />
      </View>
    </DefaultView>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: '#FBFBFB',
    padding: theme.spacing.base,
  },
  itemText: {
    ...theme.typography.body,
  },
});

export default Settings;
