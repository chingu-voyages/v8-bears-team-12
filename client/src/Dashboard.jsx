/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import DiningMateList from './DiningMateList';

import { setDiningMates } from './actionCreators';
import PageHeader from './PageHeader';

const styles = {
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
};

function Dashboard({
  classes,
  searchCity,
  searchState,
  dispatchSetDiningMates,
  diningMates
}) {
  useEffect(() => {
    if (searchCity) dispatchSetDiningMates();
  }, []);

  return (
    <div className={classes.root}>
      <PageHeader>
        <div>Add Pal</div>
      </PageHeader>
      <div className="search-area-info">
        <h4 style={{ color: 'rgb(19, 73, 134)' }}>
          Search Area:
          <span
            style={{
              color: 'black',
              borderBottom: '2px solid rgb(19, 73, 134) '
            }}
          >
            {searchCity}, {searchState}
          </span>
          <Link to="/set-search-area">
            <Button style={{ border: '1px solid grey' }}>Change</Button>
          </Link>
        </h4>
      </div>
      <DiningMateList diningMates={diningMates} />
    </div>
  );
}

Dashboard.propTypes = {
  classes: PropTypes.shape({}),
  searchCity: PropTypes.string,
  searchState: PropTypes.string,
  searchLocation: PropTypes.shape({
    type: PropTypes.string,
    coordinates: PropTypes.arrayOf(PropTypes.number)
  }),
  dispatchSetDiningMates: PropTypes.func,
  diningMates: PropTypes.arrayOf(PropTypes.object)
};

Dashboard.defaultProps = {
  classes: {},
  searchCity: '',
  searchState: '',
  searchLocation: { type: '', coordinates: [] },
  dispatchSetDiningMates: () => {},
  diningMates: []
};

const mapStateToProps = state => ({
  name: state.profile.name,
  searchCity: state.profile.searchCity,
  searchState: state.profile.searchState,
  searchLocation: state.profile.searchLocation,
  diningMates: state.dashboard.diningMates
});

const mapDispatchToProps = {
  dispatchSetDiningMates: setDiningMates
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Dashboard));
