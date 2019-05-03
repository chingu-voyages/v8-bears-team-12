import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    padding: '8px',
    textAlign: 'center'
  }
};
function PageHeader({ children, classes }) {
  return (
    <Typography className={classes.root} variant="h4">
      {children}
    </Typography>
  );
}

PageHeader.propTypes = {
  classes: PropTypes.shape({}),
  children: PropTypes.string
};

PageHeader.defaultProps = {
  classes: {},
  children: {}
};
export default withStyles(styles)(PageHeader);
