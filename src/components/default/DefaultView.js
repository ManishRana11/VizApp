import React from 'react';
import { View, StyleSheet } from 'react-native';

import { theme } from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
});

const DefaultView = ({ children, styleView }) => {
  return <View style={[styles.container, styleView]}>{children}</View>;
};

export default DefaultView;
