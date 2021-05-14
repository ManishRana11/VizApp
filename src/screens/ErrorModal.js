/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import WarningIcon from '@material-ui/icons/Warning';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import styled from 'styled-components';

const Logger = styled.div`
  color: #fff;
  background-color: #2d2c2c;
  width: 100%;
  padding: 1rem;
  font-family: monospace;
  font-size: 1.2rem;
`;

const Pre = styled.pre`
  white-space: pre-wrap;
  word-break: break-all;
`;

const ErrorModal = ({ errors }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <Text>
      <IconButton
        color="secondary"
        onClick={handleClickOpen}
        style={{ padding: '0 ' }}>
        <WarningIcon />
      </IconButton>
      <Dialog onClose={handleClose} aria-labelledby="error-dalog" open={open}>
        <DialogTitle>
          Error Log
          <IconButton
            aria-label="close"
            color="primary"
            onClick={() => setOpen(false)}
            style={{ float: 'right' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Logger>
          <Pre>{errors}</Pre>
        </Logger>
      </Dialog>
    </Text>
  );
};

ErrorModal.propTypes = {
  errors: PropTypes.oneOfType([PropTypes.array, PropTypes.any]),
};

ErrorModal.defaultProps = {
  errors: null,
};

export default ErrorModal;
