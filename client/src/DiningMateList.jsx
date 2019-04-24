import React from 'react';
import PropTypes from 'prop-types';

import DiningMate from './DiningMate';

function DiningMateList(props) {
  const { diningMates } = props;

  const diningMateElems = diningMates.map(e => (
    <DiningMate key={e._id} data={e} />
  ));
  return <div className="dining-mate-list">{diningMateElems}</div>;
}

DiningMateList.propTypes = {
  diningMates: PropTypes.arrayOf(PropTypes.object),
};

DiningMateList.defaultProps = {
  diningMates: [],
};

export default DiningMateList;
