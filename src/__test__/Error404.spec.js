/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, {Component} from 'react'
import renderer from 'react-test-renderer';
import {Router } from 'react-router-dom';
import ReactTestUtils from 'react-dom/test-utils'; 
import Error404 from '../views/Error404';

const { createMemoryHistory } = require("history");





describe('Error404 Component', () => {
  it('отображается корректно', () => {
    const history = createMemoryHistory();
    const tree = renderer.create(<Router location={history.location} navigator={history}><Error404/></Router>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // it('has an h1 tag', () => {
  //     const component = ReactTestUtils.renderIntoDocument(<Error404/>);    
  //     let h1 = ReactTestUtils.findRenderedDOMComponentWithTag(
  //     component, 'h1'
  //   )
  // });
  })
