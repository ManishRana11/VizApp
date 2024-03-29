import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const AppHeader = ({
  scene,
  previous,
  navigation,
  searchIconVisible = false,
}) => {
  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;
  const dropShadowStyle = styles.dropShadow;

  const toggleSearchVisibility = () => {
    navigation.navigate('Search');
  };

  return (
    <>
      <View style={styles.header}>
        <View style={styles.headerLeftIcon}>
          <TouchableOpacity onPress={navigation.pop}>
            {previous ? (
              <MaterialIcons
                name="chevron-left"
                size={24}
                style={styles.visible}
              />
            ) : (
              <MaterialIcons
                name="chevron-left"
                size={24}
                style={styles.invisible}
              />
            )}
          </TouchableOpacity>
        </View>
        <Text style={styles.headerText}>{title}</Text>
        <View style={styles.headerRightIconContainer}>
          {searchIconVisible ? (
            <TouchableOpacity
              style={[styles.headerRightIcon, dropShadowStyle]}
              onPress={toggleSearchVisibility}>
              <MaterialIcons name="search" size={24} style={styles.visible} />
            </TouchableOpacity>
          ) : (
            <View style={styles.invisible} />
          )}
        </View>
      </View>
    </>
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
    marginRight: 'auto',
    padding: theme.spacing.tiny,
  },
  headerRightIconContainer: {
    marginLeft: 'auto',
  },
  headerRightIcon: {
    padding: theme.spacing.tiny,
  },
  invisible: {
    width: 40,
    color: '#FFFFFF',
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
