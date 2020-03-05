import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Card from './Card';

describe('Card component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Card key={3} title="First Card" content="This is the content"/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<Card key={3} title="First Card" content="This is the content"/>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
  }); 

});