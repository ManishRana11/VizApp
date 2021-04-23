import React from 'react';
import PropTypes from 'prop-types';
// import Ghost from '../../assets/load.png';

const ErrorMessage = ({ noDataMessage }) => (
  <div className="no-data-div">
    {/* <img alt="loading" src={Ghost} className="no-data" />
    <br /> */}
    <span className="no-data-text">
      {noDataMessage || 'Data not available for the current filter'}
    </span>
  </div>
);

ErrorMessage.propTypes = {
  noDataMessage: PropTypes.string,
};

ErrorMessage.defaultProps = {
  noDataMessage: null,
};

export default ErrorMessage;
