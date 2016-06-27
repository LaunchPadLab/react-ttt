import React from 'react';
import GameInfo from './GameInfo';
import Square from './Square';
import GameLogic from '../GameLogic';

export default class Game extends React.Component {

  constructor() {
    super();

    this.state = {
      board: [],
      turn: '',
      winner: undefined,
      gameState: ''
    };
  }

  clickHandler(position) {
    const { board, turn, winner, gameState } = GameLogic.setGameState(this.state, position);

    this.setState (
      {
        board: board,
        turn: turn,
        winner: winner,
        gameState: gameState
      }
    );
  }

  newGame() {
    this.setState(GameLogic.getInitialState());
  }

  render() {
    return (
      <div>
        { this.state.gameState ?
          <div id='game'>
            {this.state.board.map((square, pos) => {
              return (
                <Square key={pos} value={square} clickHandler={this.clickHandler.bind(this, pos)} />
              );
            })}
          </div>
          : null
        }
        <GameInfo turn={this.state.turn} winner={this.state.winner} resetAction={this.newGame.bind(this)} gameState={this.state.gameState} />
      </div>
    );
  }
};
