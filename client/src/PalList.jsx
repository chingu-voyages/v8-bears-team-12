import React from 'react';
import PropTypes from 'prop-types';
import useReactRouter from 'use-react-router';
import { connect } from 'react-redux';

function PalList({ pals }) {
  const { history } = useReactRouter();
  function handleChat(palId) {
    history.push(`/pal-chat/${palId}`);
  }

  return (
    <div>
      <h1>Pal List</h1>
      <div>
        <ul>
          {pals.map(pal => (
            <li key={pal._id}>
              <p>{`Username: ${pal.name}`}</p>
              <p>{`Interests: ${pal.interests}`}</p>
              <p>{`Diet Restrictions: ${pal.dietRestrictions}`}</p>
              <button type="button" onClick={() => handleChat(pal._id)}>
                Chat
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

PalList.propTypes = {
  pals: PropTypes.arrayOf(PropTypes.object),
};

PalList.defaultProps = {
  pals: [],
};

const mapStateToProps = ({ profile }) => ({
  pals: profile.pals,
});

export default connect(mapStateToProps)(PalList);
