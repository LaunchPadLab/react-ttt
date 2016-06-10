import React from 'react';
import GameInfo from './GameInfo';
import Square from './Square'

export default class Game extends React.Component {

  constructor() {
    super();

    // this.squareClick = this.squareClick.bind(this);

    this.state = {
      board : [
                '', '', '',
                '', '', '',
                '', '', ''
              ],
      turn : 'X',
      winner : undefined
      // use another state var to define state of game overall
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
    const checkEqual = (s) => {
      return s === 'XXX' || s === 'OOO';
    }

    if (checkEqual(board[0]+board[1]+board[2])) return board[0];
    if (checkEqual(board[3]+board[4]+board[5])) return board[3];
    if (checkEqual(board[6]+board[7]+board[8])) return board[6];
    if (checkEqual(board[0]+board[3]+board[6])) return board[0];
    if (checkEqual(board[1]+board[4]+board[7])) return board[1];
    if (checkEqual(board[2]+board[5]+board[8])) return board[2];

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
      winner : undefined });
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
        <GameInfo turn={this.state.turn} winner={this.state.winner} resetAction={this.newGame} />
      </div>
    );
  }
};
