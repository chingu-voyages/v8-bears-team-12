import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { Link } from 'react-router-dom';

const styles = {
  card: {
    maxWidth: 480,
    margin: '12px 8px',
  },
  content: {
    textAlign: 'center',
  },
  actions: {
    justifyContent: 'center',
  },
  pos: {
    marginBottom: 12,
  },
};

function LandingCard({ classes, loggedIn, title, description, to }) {
  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography component="p">{description}</Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button component={Link} to={loggedIn ? to : '/login'}>
          Go
        </Button>
      </CardActions>
    </Card>
  );
}

LandingCard.propTypes = {
  classes: PropTypes.shape({}),
  loggedIn: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
  to: PropTypes.string,
};

LandingCard.defaultProps = {
  classes: {},
  loggedIn: false,
  title: '',
  description: '',
  to: '',
};

const mapStateToProps = ({ profile }) => ({
  loggedIn: profile.loggedIn,
});

export default connect(mapStateToProps)(withStyles(styles)(LandingCard));
