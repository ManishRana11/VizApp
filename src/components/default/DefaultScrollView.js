import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

import { theme } from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  scrollContainer: {
    // padding: theme.spacing.small,
  },
});

const DefaultScrollView = ({ children, styleView, styleScroll }) => {
  return (
    <View style={[styles.container, styleView]}>
      <ScrollView contentContainerStyle={[styles.scrollContainer, styleScroll]}>
        {children}
      </ScrollView>
    </View>
  );
};

export default DefaultScrollView;
