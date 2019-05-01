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

  pos: {
    marginBottom: 12,
  },
};

function LandingCard({ classes, loggedIn, title, description, to }) {
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography component="p">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} to={loggedIn ? to : '/login'}>
          Go
        </Button>
      </CardActions>
    </Card>
  );
}

LandingCard.propTypes = {
  classes: PropTypes.shape({}),
};

LandingCard.defaultProps = {
  classes: {},
};

const mapStateToProps = ({ profile }) => ({
  loggedIn: profile.loggedIn,
});

export default connect(mapStateToProps)(withStyles(styles)(LandingCard));
