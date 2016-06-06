import React from 'react';
import GameInfo from './GameInfo';
import Square from './Square'
import autobind from 'autobind-decorator';

@autobind
export default class Game extends React.Component {

  constructor() {
    super();

    this.state = {
      board : [
                '', '', '',
                '', '', '',
                '', '', ''
              ],
      turn : 'X',
      winner : undefined
    }
  }

  squareClick(position, turn){
    var board = this.state.board;
    if ( (board[position] === 'X' || board[position] === 'O') || (this.state.winner != undefined) ) return;
    board[position] = turn;
    this.setState({board: board, turn: turn === 'X' ? 'O' : 'X', winner: this.checkWinner()});
  }

  checkWinner() {
    var board = this.state.board;
    const checkEqual = (s1,s2,s3) => {
      var concat = s1+s2+s3;
      return concat === 'XXX' || concat === 'OOO';
    }

    if (checkEqual(board[0],board[1],board[2])) return board[0];
    if (checkEqual(board[3],board[4],board[5])) return board[3];
    if (checkEqual(board[6],board[7],board[8])) return board[6];
    if (checkEqual(board[0],board[3],board[6])) return board[0];
    if (checkEqual(board[1],board[4],board[7])) return board[1];
    if (checkEqual(board[2],board[5],board[8])) return board[2];

    if (board.join('').length == 9) return 'complete';
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
              <Square key={pos} value={square} pos={pos} turn={this.state.turn} squareClick={this.squareClick} />
            );
          })}
        </div>
        <GameInfo turn={this.state.turn} winner={this.state.winner} resetAction={this.newGame} />
      </div>
    );
  }
};
