import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { palAdd } from './actionCreators';

function DiningMate({ data, dispatchPalAdd }) {
  const { _id, name, interests, dietRestrictions, restaurantsList } = data;
  function handleAddPal() {
    dispatchPalAdd(_id);
  }

  return (
    <div className="dining-mate pal-card">
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
        <button type="button" onClick={handleAddPal}>
          Add Pal
        </button>
      </div>
      <div className="pal-card-info">
        <ul style={{ listStyleType: 'none' }}>
          <li>
            <span>UserName: </span>
            {name}
          </li>
          <li>
            <span>Interests: </span>
            {interests && interests.join(', ')}
          </li>
          <li>
            <span>Diet Restrictions: </span>
            {dietRestrictions}
          </li>
        </ul>
      </div>
    </div>
  );
}

DiningMate.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    interests: PropTypes.arrayOf(PropTypes.string),
    dietRestrictions: PropTypes.string,
    restaurantsList: PropTypes.arrayOf(PropTypes.object),
  }),
  dispatchPalAdd: PropTypes.func,
};

DiningMate.defaultProps = {
  data: {
    name: '',
    interests: [],
    dietRestrictions: '',
    restaurantsList: [],
  },
  dispatchPalAdd: () => {},
};

const mapDispatchToProps = {
  dispatchPalAdd: palAdd,
};

export default connect(
  null,
  mapDispatchToProps,
)(DiningMate);
