import { hot } from 'react-hot-loader/root';
import React from 'react';

import { Admin, Resource, ListGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

import { UserList } from './resources/users';

const dataProvider = jsonServerProvider('/api/admin');

function AdminApp() {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="users" list={UserList} />
    </Admin>
  );
}

export default hot(AdminApp);
