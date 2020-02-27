import React from 'react';
import List from './List.js';
import './App.css'

function App(props) {
  const lists = props.store.lists.map(list=>{
    const cards = list.cardIds.map(id => props.store.allCards[id]);
    return <List key={list.id} header={list.header} cards={cards}/>;
  });
  return (
    <main className='App'>
      <header className="App-header">
        <h1>Trelloyes!</h1>
      </header>
      <div className="App-list">
        {lists}
      </div>
    </main>
  );
}

export default App;