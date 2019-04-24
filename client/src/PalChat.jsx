import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function PalChat({ match, pals }) {
  const { palId } = match.params;
  const pal = pals.find(e => e._id === palId);

  return (
    <div>
      <h1>Pal Chat: {pal.name}</h1>
    </div>
  );
}

PalChat.propTypes = {
  pals: PropTypes.arrayOf(PropTypes.object),
};

PalChat.defaultProps = {
  pals: [],
};

const mapStateToProps = ({ profile }) => ({
  pals: profile.pals,
});

export default connect(mapStateToProps)(PalChat);
