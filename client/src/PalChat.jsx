import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';

function PalChat({ match, pals }) {
  const { palId } = match.params;
  const pal = pals.find(e => e._id === palId);

  return (
    <div className="pal-chat">
      <h1>Pal Chat: {pal.name}</h1>
      <div className="message-window" />
      <form>
        <TextField label="Your Message" variant="outlined" />
      </form>
    </div>
  );
}

PalChat.propTypes = {
  pals: PropTypes.arrayOf(PropTypes.object),
  match: PropTypes.objectOf({
    params: PropTypes.objectOf({
      palId: PropTypes.string,
    }),
  }),
};

PalChat.defaultProps = {
  pals: [],
  match: { params: {} },
};

const mapStateToProps = ({ profile }) => ({
  pals: profile.pals,
});

export default connect(mapStateToProps)(PalChat);
