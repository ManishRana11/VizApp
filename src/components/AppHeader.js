import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AppHeader = ({ scene, previous, navigation, searchVisible = false }) => {
  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;
  const dropShadowStyle = searchVisible ? styles.dropShadow : {};

  return (
    <View style={styles.header}>
      <View style={styles.headerLeftIcon} onPress={navigation.pop}>
        {previous ? (
          <MaterialIcons name="chevron-left" size={24} style={styles.visible} />
        ) : (
          <MaterialIcons
            name="chevron-left"
            size={24}
            style={styles.invisible}
          />
        )}
      </View>
      <Text style={styles.headerText}>{title}</Text>
      <View style={[styles.headerRightIcon, dropShadowStyle]}>
        {searchVisible ? (
          <MaterialIcons name="search" size={24} style={styles.visible} />
        ) : (
          <MaterialIcons name="search" size={24} style={styles.invisible} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 60,
    flexDirection: 'row',
    padding: theme.spacing.small,
  },
  headerText: {
    ...theme.typography.title2,
    fontWeight: '700',
  },
  headerLeftIcon: {
    // borderWidth: 1,
    marginRight: 'auto',
    padding: theme.spacing.tiny,
  },
  headerRightIcon: {
    marginLeft: 'auto',
    padding: theme.spacing.tiny,
  },
  invisible: {
    color: theme.colors.appbar,
  },
  visible: {
    color: '#000',
  },
  dropShadow: {
    borderRadius: 50,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});

export default AppHeader;
