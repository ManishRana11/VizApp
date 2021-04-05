import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../theme';
import { useNavigation } from '@react-navigation/native';

const colors = [
  '#FF8DD7',
  '#0BCE96',
  '#FADB6D',
  '#8BBFFF',
  '#FFA67D',
  '#FF4E4E',
];

const DashboardListCard = ({ item, index, onPress }) => {
  const color = colors[index % colors.length];
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      style={styles.itemContainer}
      onPress={() =>
        navigation.navigate('Dashboard Detail', {
          name: item.dashboardTitle || item.dashboardName,
        })
      }>
      <View style={styles.item}>
        <View style={styles.iconContainer}>
          <View style={[styles.itemLeftIcon, { backgroundColor: color }]}>
            <MaterialIcons
              name="bar-chart"
              size={40}
              color="#FFFFFF"
              margin={4}
            />
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.itemFont} numberOfLines={1}>
            {item.dashboardTitle || item.dashboardName}
          </Text>
          <View style={styles.itemRightIcon}>
            <MaterialIcons name="chevron-right" size={24} color="#4A4A4A" />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    alignSelf: 'stretch',
    marginVertical: theme.spacing.tiny,
    marginHorizontal: theme.spacing.small,
  },
  item: {
    flexDirection: 'column',
    backgroundColor: '#FEFFFF',
    padding: theme.spacing.base,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#F5EAF1',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    // Shadow for android
    elevation: 1,
    width: 175,
    alignSelf: 'stretch',
  },
  itemFont: {
    ...theme.typography.headline,
    marginLeft: theme.spacing.tiny,
    maxWidth: 100,
  },
  iconContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemLeftIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width: 75,
    height: 75,
  },
  itemRightIcon: {
    justifyContent: 'flex-end',
    marginLeft: 'auto',
  },
  textContainer: {
    flexDirection: 'row',
  },
});

export default DashboardListCard;
