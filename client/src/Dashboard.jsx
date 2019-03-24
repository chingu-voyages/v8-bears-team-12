import React from 'react';
import DiningMateSearch from './DiningMateSearch';
import DiningMateList from './DiningMateList';

function Dashboard() {
  const diningMates = [];
  function usePosition(position) {
    console.log({ position });
  }

  function doSearch(searchTerm) {
    if (searchTerm === true) {
      // do geolocation
      navigator.geolocation.getCurrentPosition(usePosition);
    }
  }

  return (
    <div>
      <DiningMateSearch doSearch={doSearch} />
      <DiningMateList diningMates={diningMates} />
    </div>
  );
}

export default Dashboard;
