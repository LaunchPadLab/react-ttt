import React from 'react';
import GameInfo from './GameInfo';
import Square from './Square';

import GameLogic from '../GameLogic';

export default class Game extends React.Component {

  constructor() {
    super();

    // could also do:
    // this.squareClick = this.squareClick.bind(this);

    this.state = {
      board : [
                '','','',
                '','','',
                '','',''
              ],
      turn : 'X',
      winner : undefined,
      gameState : 'not_started'
    }
  }

  squareClick(position) {
    const { board, turn, winner } = this.state;
    if ( (board[position] === 'X' || board[position] === 'O') || (winner !== undefined) ) return;
    board[position] = turn;
    this.setState({board: board, turn: turn === 'X' ? 'O' : 'X', winner: this.checkWinner()});
  }

  checkWinner() {
    const board = this.state.board;

    if (GameLogic.checkEqual(board[0]+board[1]+board[2])) return board[0];
    if (GameLogic.checkEqual(board[3]+board[4]+board[5])) return board[3];
    if (GameLogic.checkEqual(board[6]+board[7]+board[8])) return board[6];
    if (GameLogic.checkEqual(board[0]+board[3]+board[6])) return board[0];
    if (GameLogic.checkEqual(board[1]+board[4]+board[7])) return board[1];
    if (GameLogic.checkEqual(board[2]+board[5]+board[8])) return board[2];

    if (board.join('').length === 9) return 'none';
    return undefined;
  }

  newGame() {
    this.setState({
      board : [
                '','','',
                '','','',
                '','',''
              ],
      turn : 'X',
      winner : undefined,
      gameState : 'not_started'
    });
  }

  render() {
    return (
      <div>
        <div id='game'>
          {this.state.board.map((square, pos) => {
            return (
              <Square key={pos} value={square} squareClick={this.squareClick.bind(this, pos)} />
            );
          })}
        </div>
        <GameInfo turn={this.state.turn} winner={this.state.winner} resetAction={this.newGame} gameState={this.state.gameState} />
      </div>
    );
  }
};
