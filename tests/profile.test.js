import React from 'react';
import Profile from '../client/src/Profile';
import renderer from 'react-test-renderer';
import { exportAllDeclaration } from '@babel/types';

test('creates a userChanges object with user specified changes', () => {
  const component = renderer
    .create(
      userChanges = {
        username,
        firstName,
        lastName,
        email,
        password,
        zipcode,
        interests,
        dietRestrictions,
      }
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});
