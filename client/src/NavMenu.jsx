import React from 'react';
import PropTypes from 'prop-types';
import useReactRouter from 'use-react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function NavMenu({ loggedIn }) {
  const { location } = useReactRouter();
  const { pathname } = location;

  const notLoggedInTabs = [
    { label: 'Login', to: '/' },
    { label: 'Register', to: '/register' },
  ];

  const loggedInTabs = [
    { label: 'Home', to: '/' },
    { label: 'Profile', to: '/profile' },
    { label: 'Pick Restaurants', to: '/restaurantPicker' },
  ];

  const tabs = loggedIn ? loggedInTabs : notLoggedInTabs;
  return (
    <div>
      <Tabs
        value={pathname}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
      >
        { tabs.map(
          ({ label, to }) => <Tab key={to} component={Link} label={label} value={to} to={to} />,
        )}
      </Tabs>
    </div>
  );
}

NavMenu.propTypes = {
  loggedIn: PropTypes.bool,
};

NavMenu.defaultProps = {
  loggedIn: false,
};

const mapStateToProps = ({ profile }) => ({
  loggedIn: profile.loggedIn,
});

export default connect(mapStateToProps)(NavMenu);
