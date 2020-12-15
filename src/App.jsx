/*The App component should render markup matching the design.html: the main element, a header with the h1 and a div with class 'App-list'.
The App component will accept 1 prop, store.
The store prop is an object with 2 keys: lists and allCards.
lists is an array of objects.
allCards is an object where each key is a card's ID and the value is the card object with a title and content.
You'll be given a dummy STORE object to pass to your App.*/


import React, { Component } from 'react';
import List from './List';
import './App.css';


class App extends Component {
  static defaultProps = {
    store: {
      lists: [],
      allCards: {},
    }
  };


render() {
  const { store } = this.props
    return (
    <main class="App">
       <header class="App-header">
      <h1>Trelloyes!</h1>
    </header>
    <div class="App-list">
    {store.lists.map(list => (
            <List
              key={list.id}
              header={list.header}
              cards={list.cardIds.map(id => store.allCards[id])}
            />
          ))}
    </div>
    </main>
  );
  }
}

export default App;
