import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
// import Ghost from '../../assets/load.png';

const ErrorMessage = ({ noDataMessage }) => (
  <View className="no-data-div">
    {/* <img alt="loading" src={Ghost} className="no-data" />
    <br /> */}
    <Text className="no-data-text">
      {noDataMessage || 'Data not available for the current filter'}
    </Text>
  </View>
);

ErrorMessage.propTypes = {
  noDataMessage: PropTypes.string,
};

ErrorMessage.defaultProps = {
  noDataMessage: null,
};

export default ErrorMessage;
