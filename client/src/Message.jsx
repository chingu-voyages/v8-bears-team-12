import React from 'react';
import PropTypes from 'prop-types';

function Message({ message, pal }) {
  const name = message.sender.name === pal.name ? pal.name : 'me';
  const unreadClass =
    !message.message.read && name !== 'me' ? 'message-unread' : '';
  const meClass = name === 'me' ? 'is-me' : '';

  return (
    <div className={`chat-message ${unreadClass} ${meClass}`}>
      <div className="chat-message-name">{name !== 'me' ? name : ''}</div>
      <div className="chat-message-text">{message.message.text}</div>
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
