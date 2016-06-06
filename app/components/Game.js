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

  squareClick(position, player){
    var board = this.state.board;
    if ( (board[position] === 'X' || board[position] === 'O') || (this.state.winner != undefined) ) return;
    board[position] = player;
    this.setState({board: board, turn: player === 'X' ? 'O' : 'X', winner: this.checkWinner()});
  }

  checkWinner() {
    var board = this.state.board;
    //need to complete this logic
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
