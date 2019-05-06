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
    { label: 'Login', to: '/login' },
    { label: 'Register', to: '/register' }
  ];

  const loggedInTabs = [
    { label: 'My Pals', to: '/home' },
    { label: 'Profile', to: '/profile' },
    { label: 'My Restaurants', to: '/my-restaurants' }
  ];

  const tabs = loggedIn ? loggedInTabs : notLoggedInTabs;

  const tabsValue = tabs.map(e => e.to).some(path => path === pathname)
    ? pathname
    : false;

  return (
    <div className="app-tabs">
      <Tabs
        value={tabsValue}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
      >
        {tabs.map(({ label, to }) => (
          <Tab key={to} component={Link} label={label} value={to} to={to} />
        ))}
      </Tabs>
    </div>
  );
}

NavMenu.propTypes = {
  loggedIn: PropTypes.bool
};

NavMenu.defaultProps = {
  loggedIn: false
};

const mapStateToProps = ({ profile }) => ({
  loggedIn: profile.loggedIn
});

export default connect(mapStateToProps)(NavMenu);
