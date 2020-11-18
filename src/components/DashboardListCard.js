import React from 'react';
import { Text, StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../theme';

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

  // useEffect(() => {
  //   console.log(item);
  // });
  return (
    <TouchableWithoutFeedback
      style={styles.itemContainer}
      onPress={() => onPress()}>
      <View style={styles.item}>
        <View style={[styles.itemLeftIcon, { backgroundColor: color }]}>
          <MaterialIcons
            name="bar-chart"
            size={24}
            color="#FFFFFF"
            margin={4}
          />
        </View>
        <Text style={styles.itemFont}>
          {item.dashboardTitle || item.dashboardName}
        </Text>
        <View style={styles.itemRightIcon}>
          <MaterialIcons name="chevron-right" size={24} color="#4A4A4A" />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    alignSelf: 'stretch',
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#FEFFFF',
    padding: theme.spacing.base,
    marginVertical: theme.spacing.tiny,
    marginHorizontal: theme.spacing.small,
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
  },
  itemFont: {
    ...theme.typography.headline,
    marginLeft: theme.spacing.tiny,
  },
  itemLeftIcon: {
    justifyContent: 'flex-start',
    borderRadius: 50,
  },
  itemRightIcon: {
    justifyContent: 'flex-end',
    marginLeft: 'auto',
  },
});

export default DashboardListCard;
