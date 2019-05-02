import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useReactRouter from 'use-react-router';
import { connect } from 'react-redux';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Menu,
  MenuItem,
  IconButton
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import MoreVert from '@material-ui/icons/MoreVert';
import { withStyles } from '@material-ui/core/styles';

import { removePal } from './actionCreators';

const styles = theme => ({
  card: { maxWidth: '560px', width: '100%', margin: '8px' },
  title: { fontSize: '1.4rem', fontWeight: 500 },
  avatar: { backgroundColor: '#365577' }
});

const ITEM_HEIGHT = 48;

function PalCard({ pal, dispatchRemovePal, classes }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const { history } = useReactRouter();
  function handleChat(palId, palName) {
    history.push(`/pal-chat/${palId}/${palName}`);
  }

  function handleMore(e) {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }
  function handleRemove(palId) {
    setOpen(false);
    dispatchRemovePal(palId);
  }

  return (
    <Card className={classes.card}>
      <CardHeader
        classes={{ title: classes.title }}
        avatar={(
          <Avatar aria-label="username" className={classes.avatar}>
            {pal.name.charAt(0).toUpperCase()}
          </Avatar>
)}
        action={(
          <IconButton onClick={handleMore}>
            <MoreVert />
          </IconButton>
)}
        title={pal.name}
      />
      <CardContent>
        {pal.dietRestrictions ? (
          <p>
            Has specified the following diet restriction:{' '}
            <b>{pal.dietRestrictions}</b>
          </p>
        ) : null}
        {pal.interests ? (
          <p>Interests include: {pal.interests.join(', ')}</p>
        ) : null}

        {pal.restaurantsList ? (
          <p>
            Chosen Restaurants:{' '}
            {pal.restaurantsList.map(e => e.name).join(', ')}.
          </p>
        ) : null}
      </CardContent>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 200
          }
        }}
      >
        <MenuItem onClick={() => handleRemove(pal._id)}>Remove</MenuItem>
      </Menu>
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
  dispatchRemovePal: PropTypes.func,
  classes: PropTypes.shape({})
};

PalCard.defaultProps = {
  pal: {},
  dispatchRemovePal: () => {},
  classes: {}
};

const mapDispatchToProps = {
  dispatchRemovePal: removePal
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(PalCard));
