import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';

import { sendChat } from './actionCreators';

function PalChat({ match, pals, dispatchSendChat }) {
  const [text, setText] = useState('');
  const { palId } = match.params;
  const pal = pals.find(e => e._id === palId);

  function onSubmit(e) {
    e.preventDefault();

    dispatchSendChat({ palId: pal._id, text });
  }

  return (
    <div className="pal-chat">
      <h1>Pal Chat: {pal.name}</h1>
      <div className="message-window" />
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

const mapStateToProps = ({ profile }) => ({
  pals: profile.pals,
});

const mapDispatchToProps = {
  dispatchSendChat: sendChat,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PalChat);
