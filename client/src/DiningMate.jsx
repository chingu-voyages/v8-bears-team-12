import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { palAdd } from './actionCreators';

function DiningMate({ data, dispatchPalAdd }) {
  const { _id, name, interests, dietRestrictions, restaurantsList } = data;
  function handleAddPal() {
    // console.log('TODO: initiate chat');
    dispatchPalAdd(_id);
  }

  return (
    <div className="dining-mate">
      <button type="button" onClick={handleAddPal}>
        Add Pal
      </button>
      <ul>
        <li>{name}</li>
        <li>{interests.join(', ')}</li>
        <li>{dietRestrictions}</li>
        <li>{restaurantsList.map(e => e.name).join(', ')}</li>
      </ul>
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
