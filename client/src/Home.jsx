import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Login from './Login';
import Dashboard from './Dashboard';
import backgroundImage from './media/meal.jpg';

const styles = {
  background : {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    height: '100vh',
    width: '100vw',
    opacity: 0.9,
  }
}

function Home({ loggedIn, loading }) {
  if (loading) {
    return <div>loading</div>;
  }

  return (
    <div style={styles.background}>
      <div>
        <h1> Welcome to Pal-a-table! </h1>
        <li>
          Make your profile
        </li>
        <li>
          Browse restaurants you want to try out
        </li>
        <li>
          Search by your location to find nearby dining pals
        </li>
        <li>
          Add pals and start chatting
        </li>
        <li>
          Eat together and have fun!
        </li>
      </div>
      {loggedIn ? <Dashboard /> : <Login />}
    </div>
  );
}

const mapStateToProps = ({ profile }) => ({
  loggedIn: profile.loggedIn,
  loading: profile.loading,
});

Home.propTypes = {
  loggedIn: PropTypes.bool,
  loading: PropTypes.bool,
};

Home.defaultProps = {
  loggedIn: false,
  loading: true,
};

export default connect(
  mapStateToProps,
  null,
)(Home);
