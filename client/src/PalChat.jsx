import React, { useState, useEffect, useRef } from 'react';
import useReactRouter from 'use-react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';

import {
  sendChat,
  getChatMessages,
  clearChatMessages,
  setRouterPath,
  unsetRouterPath,
} from './actionCreators';

function PalChat({
  match,
  pals,
  dispatchSendChat,
  dispatchGetChatMessages,
  dispatchClearChatMessages,
  dispatchSetRouterPath,
  dispatchUnsetRouterPath,
  messages = [],
}) {
  const [text, setText] = useState('');
  const messageEnd = useRef(null);
  const { location } = useReactRouter();
  const { palId } = match.params;
  const pal = pals.find(e => e._id === palId);

  useEffect(() => {
    const { pathname } = location;
    dispatchSetRouterPath(pathname);
    return () => {
      dispatchUnsetRouterPath();
    };
  }, []);
  useEffect(() => {
    dispatchGetChatMessages({ palId });
    return () => {
      dispatchClearChatMessages();
    };
  }, []);
  function onSubmit(e) {
    e.preventDefault();

    dispatchSendChat({ palId: pal._id, text });
  }

  useEffect(() => {
    messageEnd.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="pal-chat">
      <h1>Pal Chat: {pal.name}</h1>
      <div className="messages-window">
        {messages.map(message => {
          const name = message.sender.name === pal.name ? pal.name : 'me';
          const unreadClass =
            !message.message.read && name !== 'me' ? 'message-unread' : '';

          return (
            <div className={unreadClass} key={message._id}>
              <b>{name}</b>: {message.message.text}
            </div>
          );
        })}
        <div ref={messageEnd} />
      </div>

      <form onSubmit={onSubmit}>
        <TextField
          required
          label="Your Message"
          onChange={e => setText(e.target.value)}
          variant="outlined"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

PalChat.propTypes = {
  pals: PropTypes.arrayOf(PropTypes.object),
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
  dispatchClearChatMessages: PropTypes.func,
  dispatchGetChatMessages: PropTypes.func,
  dispatchSendChat: PropTypes.func,
  dispatchSetRouterPath: PropTypes.func,
  dispatchUnsetRouterPath: PropTypes.func,
  messages: PropTypes.arrayOf(PropTypes.object),
};

PalChat.defaultProps = {
  pals: [],
  match: { params: {} },
  dispatchClearChatMessages: () => {},
  dispatchGetChatMessages: () => {},
  dispatchSendChat: () => {},
  dispatchSetRouterPath: () => {},
  dispatchUnsetRouterPath: () => {},
  messages: [],
};

const mapStateToProps = ({ profile, chat }) => ({
  pals: profile.pals,
  messages: chat.messages,
});

const mapDispatchToProps = {
  dispatchSendChat: sendChat,
  dispatchGetChatMessages: getChatMessages,
  dispatchClearChatMessages: clearChatMessages,
  dispatchSetRouterPath: setRouterPath,
  dispatchUnsetRouterPath: unsetRouterPath,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PalChat);
