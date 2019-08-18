import React from 'react';
import {
  List,
  Edit,
  Create,
  Datagrid,
  TextField,
  EmailField,
  SimpleForm,
  TextInput,
  BooleanInput,
} from 'react-admin';

const required = (message = 'Required') => value => value ? undefined: 'uhjklhl';

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
  <Edit {...props} undoable={false}>
    <SimpleForm>
      <TextInput source="id" />
      <TextInput source="name" />
      <TextInput source="firstName" />
      <TextInput source="lastName" />
      <TextInput source="email" />
      <TextInput source="password" />
      <TextInput source="dietRestrictions" />
      <TextInput source="interests" />
      <TextInput source="restaurantsList" />
      <TextInput source="pals" />
      <TextInput source="resetPasswordToken" />
      <TextInput source="resetPasswordExpires" />
      <BooleanInput source="active" />
      <TextInput source="searchCity" />
      <TextInput source="searchState" />
      <TextInput source="searchLocation.coordinates" />
      <TextInput source="roles" />
    </SimpleForm>
  </Edit>
);

export const UserCreate  = props => (
  <Create {...props} undoable={false}>
    <SimpleForm>
      <TextInput validate={required()} source="name" />
      <TextInput validate={required()} source="email" />
      <TextInput validate={required()} type="password" source="password" />
      <TextInput source="firstName" />
      <TextInput source="lastName" />
      <TextInput source="dietRestrictions" />
      <TextInput source="interests" />
      <BooleanInput source="active" />
      <TextInput source="roles" />
    </SimpleForm>
  </Create>
);
