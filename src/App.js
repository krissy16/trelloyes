import React from 'react';
import List from './List.js';
import STORE from './store.js';
import './App.css'

class App extends React.Component{
    state = {
      lists: STORE.lists,
      allCards: STORE.allCards
    }
  
  renderLists = () => {
    return this.state.lists.map(list=>{
      const cards = list.cardIds.map(id => this.state.allCards[id]);
      return <List 
                key={list.id}
                id={list.id} 
                header={list.header} 
                cards={cards} 
                onDeleteItem={this.handleDeleteItem} 
                onAddItem={() => this.handleAddItem(list.id)}/>;
    });
  }
  handleDeleteItem = (cardId) => {
    console.log('delete '+ cardId);
    let lists = this.state.lists;
    lists = lists.map(item => ({
      ...item,
      cardIds: item.cardIds.filter(c => c !== cardId)
    }));
    const newCards = this.omit(this.state.allCards, cardId);
    this.setState({
      lists: lists,
      allCards: newCards
    });
    console.log(this.omit(this.state.allCards, cardId))
  }
  omit(obj, keyToOmit) {
    return Object.entries(obj).reduce(
      (newObj, [key, value]) =>
          key === keyToOmit ? newObj : {...newObj, [key]: value},
      {}
    );
  }
  handleAddItem(id){
    console.log('adding random card to list '+id);
    const newCard = this.generateRandom();
    let newLists = this.state.lists;
    newLists[newLists.findIndex(x => x.id === id)].cardIds.push(newCard.id);
    this.setState({
      lists: newLists,
      allCards: {
        ...this.state.allCards,
        [newCard.id]: newCard
      }
    });
  }
  generateRandom(){
    const id = Math.random().toString(36).substring(2, 4) + Math.random().toString(36).substring(2, 4);
    return {
      id,
      title: `Random Card ${id}`,
      content: 'lorem ipsum',
    }
  }
  render(){
    return (
      <main className='App'>
        <header className="App-header">
          <h1>Trelloyes!</h1>
        </header>
        <div className="App-list">
          {this.renderLists()}
        </div>
      </main>
    );
  }
}

export default App;