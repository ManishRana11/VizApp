import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../theme';

const colors = [
  '#FF8DD7',
  '#0BCE96',
  '#FADB6D',
  '#8BBFFF',
  '#FFA67D',
  '#FF4E4E',
];

const DashboardListCard = ({ item, index }) => {
  const color = colors[index % colors.length];
  return (
    <View style={styles.item}>
      <MaterialCommunityIcons name="chart-donut" size={24} color={color} />
      <Text style={styles.itemFont}>
        {item.dashboardTitle || item.dashboardName}
      </Text>
      <MaterialCommunityIcons name="chevron-right" size={24} color="#4A4A4A" />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FEFFFF',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
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
  },
});

export default DashboardListCard;
