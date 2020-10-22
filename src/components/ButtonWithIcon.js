import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../theme';

const ButtonWithIcon = ({ title, iconName, onPress }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={() => onPress()}>
      <View style={styles.buttonViewContainer}>
        <MaterialIcons name={iconName} size={24} color="#C4C4C4" />
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: 'stretch',
  },
  buttonViewContainer: {
    flexDirection: 'row',
    backgroundColor: '#FBFBFB',
    borderBottomWidth: 1.5,
    borderColor: 'rgba(221, 221, 221, 0.24)',
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: theme.spacing.base,
    ...theme.typography.body,
  },
  buttonText: {
    marginLeft: theme.spacing.small,
    color: '#6C6C6C',
  },
});

export default ButtonWithIcon;
