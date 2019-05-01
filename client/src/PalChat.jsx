import React, { useState, useEffect, useRef } from 'react';
import useReactRouter from 'use-react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Message from './Message';
import {
  sendChat,
  getChatMessages,
  clearChatMessages,
  setRouterPath,
  unsetRouterPath,
} from './actionCreators';

const styles = {
  root: {
    display: 'flex',
    height: '100vh',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    padding: '8px 16px',
    color: 'white',
    fontWeight: 'bold',
    background: 'black',
    borderRadius: '5px',
    width: '100%',
    textAlign: 'center',
  },
  messagesWindow: {
    flex: 1,
    overflowY: 'scroll',
    width: '100%',
  },
  form: {
    display: 'flex',
    width: '100%',
  },
  formTextField: {
    flex: 1,
  },
  noMessages: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
};

function PalChat({
  match,
  pals,
  loaded,
  dispatchSendChat,
  dispatchGetChatMessages,
  dispatchClearChatMessages,
  dispatchSetRouterPath,
  dispatchUnsetRouterPath,
  messages = [],
  classes,
}) {
  const [text, setText] = useState('');
  const messageEnd = useRef(null);
  const { location } = useReactRouter();
  const { palId, palName } = match.params;
  //const pal = pals.find(e => e._id === palId);
  const pal = { _id: palId, name: palName };

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
    setText('');
  }

  useEffect(() => {
    messageEnd.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h5">
        Pal Chat: {pal.name}
      </Typography>
      <div className={classes.messagesWindow}>
        {messages.map(message => (
          <Message key={message._id} message={message} pal={pal} />
        ))}
        {!messages.length && loaded ? (
          <Typography variant="h6" className={classes.noMessages}>
            There are no messages! Why not say hi!
          </Typography>
        ) : null}
        <div ref={messageEnd} />
      </div>

      <form className={classes.form} onSubmit={onSubmit}>
        <TextField
          spellCheck={false}
          className={classes.formTextField}
          required
          label="Your Message"
          value={text}
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
  classes: PropTypes.shape({}),
  loaded: PropTypes.bool,
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
  classes: {},
  loaded: false,
};

const mapStateToProps = ({ profile, chat }) => ({
  pals: profile.pals,
  messages: chat.messages,
  loaded: chat.loaded,
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
)(withStyles(styles)(PalChat));
