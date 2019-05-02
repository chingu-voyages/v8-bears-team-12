import React from 'react';
import PropTypes from 'prop-types';
import useReactRouter from 'use-react-router';
import { connect } from 'react-redux';
import { Button, Card, CardActions } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { removePal } from './actionCreators';

import PalCardHeader from './PalCardHeader';
import PalCardContent from './PalCardContent';

const styles = () => ({
  root: { maxWidth: '560px', width: '100%', margin: '8px' },
  title: { fontSize: '1.4rem', fontWeight: 500 },
  avatar: { backgroundColor: '#365577' }
});

function PalCard({ pal, classes }) {
  const { history } = useReactRouter();
  function handleChat(palId, palName) {
    history.push(`/pal-chat/${palId}/${palName}`);
  }

  return (
    <Card className={classes.root}>
      <PalCardHeader pal={pal} />
      <PalCardContent pal={pal} />
      <CardActions>
        <Button type="button" onClick={() => handleChat(pal._id, pal.name)}>
          Chat
        </Button>
      </CardActions>
    </Card>
  );
}

PalCard.propTypes = {
  pal: PropTypes.shape({}),
  classes: PropTypes.shape({})
};

PalCard.defaultProps = {
  pal: {},
  classes: {}
};

const mapDispatchToProps = {
  dispatchRemovePal: removePal
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(PalCard));
