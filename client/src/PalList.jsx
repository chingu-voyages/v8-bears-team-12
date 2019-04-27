import React from 'react';
import PropTypes from 'prop-types';
import useReactRouter from 'use-react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { removePal } from './actionCreators';

function PalList({ pals, dispatchRemovePal }) {
  const { history } = useReactRouter();
  function handleChat(palId) {
    history.push(`/pal-chat/${palId}`);
  }

  function onRemove(palId) {
    dispatchRemovePal(palId);
  }

  return (
    <div className="pal-container">
      <h1>Pal List</h1>
      {pals.map(pal => (
        <div key={pal._id} className="pal-card">
          <div className="pal-card-image">
            <img
              src="https://via.placeholder.com/100"
              style={{
                minwidth: '100px',
                minheight: '100px',
                border: '1px solid gray',
              }}
              alt="user"
            />
            <button type="button" onClick={() => handleChat(pal._id)}>
              Chat
            </button>
          </div>
          <div className="pal-card-info">
            <ul style={{ listStyleType: 'none' }}>
              <li>
                <span>UserName: </span>
                {pal.name}
              </li>
              <li>
                <span>Interests: </span>
                {pal.interests && pal.interests.join(', ')}
              </li>
              <li>
                <span>Diet Restrictions: </span>
                {pal.dietRestrictions && pal.dietRestrictions}
              </li>
              <li>
                <span>Restaurants List: </span>
                {pal.restaurantsList.map(e => e.name).join(', ')}
              </li>
            </ul>
          </div>
          <div>
            <button type="button" onClick={() => onRemove(pal._id)}>
              X
            </button>
          </div>
        </div>
      ))}
      {!pals.length && (
        <div>
          You currently have no pals. Add some from the <Link to="/">Home</Link>{' '}
          Tab.
        </div>
      )}
    </div>
  );
}

PalList.propTypes = {
  pals: PropTypes.arrayOf(PropTypes.object),
  dispatchRemovePal: PropTypes.func,
};

PalList.defaultProps = {
  pals: [],
  dispatchRemovePal: () => {},
};

const mapStateToProps = ({ profile }) => ({
  pals: profile.pals,
});

const mapDispatchToProps = {
  dispatchRemovePal: removePal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PalList);
