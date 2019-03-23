import React from 'react';
import PropTypes from 'prop-types';

function DiningMate(props) {
  const {
    name, interests, dietRestrictions, restaurantsList,
  } = props;

  function handleClick() {
    // console.log('TODO: initiate chat');
  }

  return (
    <div className="dining-mate">
      <button type="button" onClick={handleClick}>
        Chat
      </button>
      <ul>
        <li>{name}</li>
        <li>{interests.join(', ')}</li>
        <li>{dietRestrictions.join(', ')}</li>
        <li>{restaurantsList.join(', ')}</li>
      </ul>
    </div>
  );
}

DiningMate.propTypes = {
  name: PropTypes.string,
  interests: PropTypes.arrayOf(PropTypes.string),
  dietRestrictions: PropTypes.arrayOf(PropTypes.string),
  restaurantsList: PropTypes.arrayOf(PropTypes.string),
};

DiningMate.defaultProps = {
  name: '',
  interests: [],
  dietRestrictions: [],
  restaurantsList: [],
};

export default DiningMate;
