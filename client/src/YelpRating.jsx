import React from 'react';

import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    background:
      'url(https://s3-media2.fl.yelpcdn.com/assets/srv0/yelp_design_web/9b34e39ccbeb/assets/img/stars/stars.png)',
    backgroundSize: '132px 560px',
    verticalAlign: 'middle',
    display: 'inline-block',
    width: '132px',
    height: '24px'
  }
};

function YelpRating({ rating, classes }) {
  const RATINGS = [0, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
  const idx = RATINGS.indexOf(rating);
  if (idx === -1) return <div />;

  return (
    <div
      className={classes.root}
      style={{ backgroundPosition: `0 -${idx * 24}px` }}
    />
  );
}

export default withStyles(styles)(YelpRating);
