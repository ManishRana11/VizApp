import React from 'react';
import { View, StyleSheet } from 'react-native';

import { theme } from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: theme.spacing.small,
  },
});

const DefaultView = ({ children, styleView }) => {
  return <View style={[styles.container, styleView]}>{children}</View>;
};

export default DefaultView;
