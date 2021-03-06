import { hot } from 'react-hot-loader/root';
import React from 'react';

import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

import { UserList, UserEdit, UserCreate} from './resources/users';

const dataProvider = jsonServerProvider('/api/admin');

function AdminApp() {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} />
    </Admin>
  );
}

export default hot(AdminApp);
