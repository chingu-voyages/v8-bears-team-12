import React, { useState } from 'react';
import PropTypes from 'prop-types';

function DiningMateSearch(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const { doSearch } = props;

  function onChange(event) {
    setSearchTerm(event.target.value);
  }
  return (
    <div>
      <input type="text" onChange={onChange} />
      <button type="button" onClick={() => doSearch(true)}>
        My location
      </button>
      <button type="button" onClick={() => doSearch(searchTerm)}>
        Search
      </button>
    </div>
  );
}

DiningMateSearch.propTypes = {
  doSearch: PropTypes.func,
};

DiningMateSearch.defaultProps = {
  doSearch: () => {},
};

export default DiningMateSearch;
