import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../../theme';

const ChartView = ({ children, styleView, title = '' }) => {
  const [isVisible, setIsVisible] = useState(true);
  const childrenWithVisibility = React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      visibility: isVisible,
    });
  });

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <View style={[styles.chartView, styleView]}>
      <View style={styles.header}>
        <View style={styles.title}>
          <Text>{title}</Text>
        </View>
        <View style={styles.icons}>
          <View style={styles.infoIcon}>
            <MaterialIcons name="info" size={24} color="#818181" />
          </View>
          <MaterialIcons
            name="visibility"
            size={24}
            color="#818181"
            onPress={() => toggleVisibility()}
          />
        </View>
      </View>
      <View style={styles.chartContainer}>{childrenWithVisibility}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  chartView: {
    alignSelf: 'stretch',
    margin: theme.spacing.small,
    padding: theme.spacing.tiny,
    borderWidth: 1,
    borderColor: theme.colors.gray,
    borderRadius: 10,
  },
  header: {
    height: theme.spacing.base,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {},
  icons: {
    flexDirection: 'row',
  },
  infoIcon: {
    marginHorizontal: theme.spacing.tiny,
  },
});

export default ChartView;
