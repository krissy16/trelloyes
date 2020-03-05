import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import List from './List';
import STORE from './store.js';


const list= STORE.lists[0];
const cards = list.cardIds.map(id => STORE.allCards[id]);

describe('List component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<List key={list.id} header={list.header} cards={cards}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<List key={list.id} header={list.header} cards={cards} />)
      .toJSON();
    expect(tree).toMatchSnapshot();  
  });

});