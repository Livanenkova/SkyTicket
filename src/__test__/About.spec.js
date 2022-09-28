/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react'
import renderer from 'react-test-renderer';
import {Router } from 'react-router-dom';
import About from '../views/About';

const { createMemoryHistory } = require("history");


it('отображается корректно', () => {
  const history = createMemoryHistory();
  const tree = renderer.create(<Router location={history.location} navigator={history}><About/></Router>).toJSON();
  expect(tree).toMatchSnapshot();
});
