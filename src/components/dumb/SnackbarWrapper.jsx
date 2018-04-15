import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';

function SnackBarWrapper(props) {
  return (
    <Snackbar
      open={props.open}
      message={props.message}
      autoHideDuration={2000}
    />
  );
}

SnackBarWrapper.propTypes = {
  open: PropTypes.bool,
  message: PropTypes.string
};

export default SnackBarWrapper;
