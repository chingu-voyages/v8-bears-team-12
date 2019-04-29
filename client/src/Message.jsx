import React from 'react';
import PropTypes from 'prop-types';

function Message({ message, pal }) {
  const name = message.sender.name === pal.name ? pal.name : 'me';
  const unreadClass =
    !message.message.read && name !== 'me' ? 'message-unread' : '';

  return (
    <div className={unreadClass} key={message._id}>
      <b>{name}</b>: {message.message.text}
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

export default Message;
