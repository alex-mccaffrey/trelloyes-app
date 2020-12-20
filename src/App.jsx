/*The App component should render markup matching the design.html: the main element, a header with the h1 and a div with class 'App-list'.
The App component will accept 1 prop, store.
The store prop is an object with 2 keys: lists and allCards.
lists is an array of objects.
allCards is an object where each key is a card's ID and the value is the card object with a title and content.
You'll be given a dummy STORE object to pass to your App.*/
import React, { Component } from 'react';
import List from './List';
import './App.css';
import STORE from './store';

  const newRandomCard = () => {
    const id = Math.random().toString(36).substring(2, 4)
      + Math.random().toString(36).substring(2, 4);
    return {
      id,
      title: `Random Card ${id}`,
      content: 'lorem ipsum',
    }
  }

  class App extends Component {
    state = {
      store: STORE
    };
  

  handleDeleteCard = (cardId) => {
    const { lists, allCards } = this.state.store;

    const newLists = lists.map(list => ({
      ...list,
      cardIds: list.cardIds.filter(id => id !== cardId)
    }));

   function omit(obj, keyToOmit) {
      let {[keyToOmit]: _, ...rest} = obj;
      return rest;
    }

    const newCards = omit(allCards, cardId);

    this.setState({
      store: {
        lists: newLists,
        allCards: newCards
      }
    })
  };


  handleAddCard = (listId) => {
    const newCard = newRandomCard()

    const newLists = this.state.store.lists.map(list => {
      if (list.id === listId) {
	return {
          ...list,
          cardIds: [...list.cardIds, newCard.id]
        };
      }
      return list;
    })

    this.setState({
      store: {
        lists: newLists,
        allCards: {
          ...this.state.store.allCards,
          [newCard.id]: newCard
        }
      }
    })
  };
    
  
  


  render() {
    const { store } = this.state
    return (
      <main className="App">
        <header className="App-header">
          <h1>Trelloyes!</h1>
        </header>
        <div className="App-list">
          {store.lists.map(list => (
            <List
              key={list.id}
              header={list.header}
              cards={list.cardIds.map(id => store.allCards[id])}
              onDeleteCard={this.handleDeleteCard}
              onAddCard={this.handleAddCard}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
