import React from 'react';
import {
  List,
  Edit,
  Datagrid,
  TextField,
  EmailField,
  SimpleForm,
  TextInput,
} from 'react-admin';

export const UserList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <EmailField source="email" />
      <TextField source="name" />
      <TextField source="firstName" />
      <TextField source="lastName" />
    </Datagrid>
  </List>
);

export const UserEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="firstName" />
      <TextInput source="lastName" />
      <TextInput source="email" />
      <TextInput source="id" />
    </SimpleForm>
  </Edit>
);
