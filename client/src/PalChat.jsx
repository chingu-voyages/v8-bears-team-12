import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';

import { sendChat, getChatMessages } from './actionCreators';

function PalChat({
  match,
  pals,
  dispatchSendChat,
  dispatchGetChatMessages,
  messages = [{ _id: 1, text: 'a' }, { _id: 2, text: 'b' }],
}) {
  const [text, setText] = useState('');
  const { palId } = match.params;
  const pal = pals.find(e => e._id === palId);

  useEffect(() => {
    dispatchGetChatMessages({ palId });
  }, []);
  function onSubmit(e) {
    e.preventDefault();

    dispatchSendChat({ palId: pal._id, text });
  }

  return (
    <div className="pal-chat">
      <h1>Pal Chat: {pal.name}</h1>
      <div className="messages-window">
        {messages.map(message => (
          <div key={message._id}>{JSON.stringify(message)}</div>
        ))}
      </div>

      <form onSubmit={onSubmit}>
        <TextField
          required
          label="Your Message"
          onChange={e => setText(e.target.value)}
          variant="outlined"
        />
        <button type="Submit">Send</button>
      </form>
    </div>
  );
}

PalChat.propTypes = {
  pals: PropTypes.arrayOf(PropTypes.object),
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
};

PalChat.defaultProps = {
  pals: [],
  match: { params: {} },
};

const mapStateToProps = ({ profile, chat }) => ({
  pals: profile.pals,
  messages: chat.messages,
});

const mapDispatchToProps = {
  dispatchSendChat: sendChat,
  dispatchGetChatMessages: getChatMessages,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PalChat);
