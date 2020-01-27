import React, { Component } from 'react';
import Card from './card';
import { newDeck, loadCards } from './utils';

export default class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck_id: '',
      cards: [],
      selected: [
        { code: '', value: '' },
        { code: '', value: '' }
      ],
      selectionMode: false
    };
  }

  render() {
    return (
      <div className='board'>
        <button onClick={this.newGame}>New Game</button>
        <div className='deck'>
          {this.state.cards.length > 0
            ? this.state.cards.map(card => {
                return (
                  <div
                    className='anchor'
                    key={`${card.code}`}
                    onClick={() => this.selectCard(card.code, card.value)}
                  >
                    <Card
                      show={
                        this.state.selected.filter(s => s.code === card.code)
                          .length > 0
                          ? true
                          : false
                      }
                      alt={`${card.value} ${card.suit}`}
                      src={card.image}
                    />
                  </div>
                );
              })
            : null}
          {this.state.cards.length === 0 && this.state.selectionMode ? (
            <div className='done'>Game ended</div>
          ) : null}
        </div>
      </div>
    );
  }

  // creating a new deck / game
  newGame = async () => {
    await newDeck()
      .then(
        function onFulfilledJSON(json) {
          this.setState({
            ...this.state,
            selected: [
              { code: '', value: '' },
              { code: '', value: '' }
            ],
            deck_id: json.deck_id,
            remaining: json.remaining,
            selectionMode: false
          });
        }.bind(this)
      )
      .catch(function onRejected(reason) {
        console.log(reason);
      });

    this.loadBoard();
  };

  // Loading cards on the board
  loadBoard = async () => {
    await loadCards(this.state.deck_id)
      .then(
        function onFulfilledJSON(json) {
          this.setState({
            ...this.state,
            cards: json.cards,
            selectionMode: true
          });
        }.bind(this)
      )
      .catch(function onRejected(reason) {
        console.log(reason);
      });
  };

  // When clicking on a card
  selectCard = (code, value) => {
    switch (this.state.selected.filter(s => s.code !== '').length) {
      case 0:
        this.setState({
          ...this.state,
          selected: [{ code: code, value: value }]
        });
        break;
      case 1:
        const selected = this.state.selected;
        selected.push({ code: code, value: value });
        this.setState({ ...this.state, selected });
        setTimeout(() => {
          if (this.state.selected[0].value === value) {
            const filtered = this.state.cards.filter(card => {
              return (
                card.code !== this.state.selected[1].code &&
                card.code !== this.state.selected[0].code
              );
            });
            this.setState({
              ...this.state,
              cards: filtered,
              selected: [
                { code: '', value: '' },
                { code: '', value: '' }
              ]
            });
          } else {
            this.setState({
              ...this.state,
              selected: [
                { code: '', value: '' },
                { code: '', value: '' }
              ]
            });
          }
        }, 1000);
        break;
      default:
        this.setState({
          ...this.state,
          selected: [
            { code: '', value: '' },
            { code: '', value: '' }
          ]
        });
        break;
    }
  };
}
