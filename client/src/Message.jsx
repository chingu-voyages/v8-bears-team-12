import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    width: '100%',
  },
};

function Message({ message, pal, classes }) {
  const name = message.sender.name === pal.name ? pal.name : 'me';
  const unreadClass =
    !message.message.read && name !== 'me' ? 'message-unread' : '';

  return (
    <div className={classes.root}>
      <div className={unreadClass} key={message._id}>
        <b>{name}</b>: {message.message.text}
      </div>
    </div>
  );
}

Message.propTypes = {
  message: PropTypes.shape({}),
  pal: PropTypes.shape({}),
};

Message.defaultProps = {
  message: {},
  pal: {},
};

export default withStyles(styles)(Message);
