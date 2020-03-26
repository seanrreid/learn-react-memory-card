import React, { Component } from 'react';
import MemoryCard from './components/MemoryCard';
import './App.css';

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */

const shuffle = a => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const generateDeck = () => {
  const symbols = [`∆`, `ß`, `£`, `§`, `•`, `$`, `+`, `ø`];
  const deck = [];

  for (let i = 0; i < 16; i++) {
    deck.push({
      symbol: symbols[i % 8],
      isFlipped: false
    });
  }
  shuffle(deck);
  return deck;
};

class App extends Component {
  state = {
    deck: generateDeck(),
    pickedCards: [],
    foo: 'bar?'
  };

  pickCard = cardIndex => {
    const { deck } = this.state;
    if (deck[cardIndex].isFlipped === true) {
      return;
    }
    const cardToFlip = { ...this.state.deck[cardIndex] };
    cardToFlip.isFlipped = true;

    let newDeck = deck.map((card, index) => {
      if (cardIndex === index) {
        return cardToFlip;
      }
      return card;
    });

    let newPickedCards = this.state.pickedCards.concat(cardIndex);
    if (newPickedCards.length === 2) {
      const card1Index = newPickedCards[0];
      const card2Index = newPickedCards[1];
      const firstCard = newDeck[card1Index];
      const secondCard = newDeck[card2Index];

      if (firstCard.symbol !== secondCard.symbol) {
        console.log("we don't have a match!");
        setTimeout(() => {
          this.unFlipCards(card1Index, card2Index);
        }, 1000);
      }

      newPickedCards = [];
    }

    this.setState({
      deck: newDeck,
      pickedCards: newPickedCards
    });
  };

  unFlipCards = (card1Index, card2Index) => {
    console.log('unflipping');
    const { deck } = this.state;
    const newDeck = deck.map(card => {
      return { ...card };
    });

    newDeck[card1Index].isFlipped = false;
    newDeck[card2Index].isFlipped = false;

    this.setState({
      deck: newDeck
    });
  };

  render() {
    const { deck } = this.state;
    const cardsJSX = deck.map((card, index) => {
      return (
        <MemoryCard
          key={`MemoryCard-${index}`}
          symbol={card.symbol}
          isFlipped={card.isFlipped}
          pickCard={() => this.pickCard(index)}
        />
      );
    });

    return (
      <div className="App">
        <header className="App-header">
          <h1>Memory Game</h1>
          <h2>Match Cards to Win</h2>
        </header>
        <div className="gameBoard">
          {cardsJSX.slice(0, 4)}
          {cardsJSX.slice(4, 8)}
          {cardsJSX.slice(8, 12)}
          {cardsJSX.slice(12, 16)}
        </div>
      </div>
    );
  }
}

export default App;
