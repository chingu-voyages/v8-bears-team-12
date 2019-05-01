import React from 'react';
import PropTypes from 'prop-types';
import TimeAgo from 'react-timeago';

function Message({ message, pal }) {
  const name = message.sender.name === pal.name ? pal.name : 'me';
  const unreadClass =
    !message.message.read && name !== 'me' ? 'message-unread' : '';
  const meClass = name === 'me' ? 'is-me' : '';

  return (
    <div className={`chat-message ${unreadClass} ${meClass}`}>
      {name !== 'me' ? <div className="chat-message-name">{name}</div> : null}
      <div className="chat-message-text">
        <div>{message.message.text}</div>
        <div className="chat-message-created-time">
          <TimeAgo minPeriod={30} date={message.createdAt} />
        </div>
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

export default Message;
