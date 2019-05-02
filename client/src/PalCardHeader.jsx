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
  root: { background: '#ededed', marginBottom: '4px' },
  title: { fontSize: '1.4rem', fontWeight: 500 },
  avatar: { backgroundColor: '#365577' }
});

const ITEM_HEIGHT = 48;

function PalCardHeader({ pal, showMenu, dispatchRemovePal, classes }) {
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
        classes={{ title: classes.title, root: classes.root }}
        avatar={(
          <Avatar aria-label="username" className={classes.avatar}>
            {pal.name.charAt(0).toUpperCase()}
          </Avatar>
)}
        action={
          showMenu ? (
            <IconButton onClick={handleMore}>
              <MoreVert />
            </IconButton>
          ) : null
        }
        title={pal.name}
      />
      {showMenu ? (
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          getContentAnchorEl={null}
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
      ) : null}
    </>
  );
}

PalCardHeader.propTypes = {
  pal: PropTypes.shape({}),
  dispatchRemovePal: PropTypes.func,
  classes: PropTypes.shape({}),
  showMenu: PropTypes.bool
};

PalCardHeader.defaultProps = {
  pal: {},
  dispatchRemovePal: () => {},
  classes: {},
  showMenu: false
};

const mapDispatchToProps = {
  dispatchRemovePal: removePal
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(PalCardHeader));
