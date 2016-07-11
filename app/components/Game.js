import React from 'react';
import Square from './Square';
import GameLogic from '../GameLogic';

export default class Game extends React.Component {

  constructor() {
    super();

    this.state = GameLogic.getInitialState();
  }

  clickHandler(position) {
    this.setState(GameLogic.setGameState(this.state, position));
  }

  newGame() {
    this.setState(GameLogic.getInitialState());
  }

  render() {

    const { board, turn, winner } = this.state;

    return (
      <div>

        <button
          className="btn btn-primary"
          onClick={this.newGame.bind(this)}>

          New Game
        </button>

        <span style={{paddingLeft: '5px'}}>
          <b>{GameLogic.setGameTitle(this.state)}</b>
        </span>

        <div id="board">

          {board.map((square, idx) =>

            <Square
              key={idx}
              value={square}
              clickHandler={this.clickHandler.bind(this, idx)} />
          )}
        </div>
      </div>
    );
  }
}
