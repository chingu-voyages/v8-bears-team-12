import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Avatar,
  CardHeader,
  Menu,
  MenuItem,
  IconButton
} from '@material-ui/core';
import MoreVert from '@material-ui/icons/MoreVert';
import { withStyles } from '@material-ui/core/styles';

import { removePal } from './actionCreators';

const styles = () => ({
  title: { fontSize: '1.4rem', fontWeight: 500 },
  avatar: { backgroundColor: '#365577' }
});

const ITEM_HEIGHT = 48;

function PalCardHeader({ pal, dispatchRemovePal, classes }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

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
    <>
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
    </>
  );
}

PalCardHeader.propTypes = {
  pal: PropTypes.shape({}),
  dispatchRemovePal: PropTypes.func,
  classes: PropTypes.shape({})
};

PalCardHeader.defaultProps = {
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
)(withStyles(styles)(PalCardHeader));
