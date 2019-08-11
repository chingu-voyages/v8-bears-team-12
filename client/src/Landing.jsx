import React from 'react';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import LandingCard from './LandingCard';

const styles = {
  title: {
    textAlign: 'center'
  },
  guideCards: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100%',
    }
};

const Landing = ({ classes }) => {
  return (
    <div className="guide">
      <div className={classes.guideCards}>
        <Typography className={classes.title} variant="h4">
          Let&rsquo;s meet and eat!
        </Typography>
        <LandingCard
          title="Make your profile"
          description="Fill in your profile here"
          to="/profile"
        />
        <LandingCard
          title="Pick Restaurants"
          description="Browse restaurants you want to try out"
          to="/my-restaurants"
        />
        <LandingCard
          title="Find Pals"
          description="Search by location to find nearby dining pals. Add pals and start chatting"
          to="/home"
        />
      </div>
    </div>
  );
};

export default withStyles(styles)(Landing);
