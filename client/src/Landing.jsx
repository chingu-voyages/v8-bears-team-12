import React from 'react';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import LandingCard from './LandingCard';

const styles = {
  title: {
    textAlign: 'center'
  }
};

const Landing = ({ classes }) => {
  return (
    <div className="guide">
      <div className="guide-cards">
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
          to="/restaurantPicker"
        />
        <LandingCard
          title="Find Pals"
          description="Search by location to find nearby dining pals. Add pals and start chatting"
          to="/home"
        />
        <LandingCard
          title="Start a Pal Chat"
          description="Chat and meet to eat"
          to="/pal-list"
        />
      </div>
    </div>
  );
};

export default withStyles(styles)(Landing);
