import React from 'react';
import { Typography } from '@material-ui/core';

import LandingCard from './LandingCard';

const Landing = () => {
  return (
    <div className="guide">
      <div className="guide-cards">
        <Typography className="guide-title" variant="h4">
          Let's meet and eat!
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

export default Landing;
