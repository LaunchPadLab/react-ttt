import React from 'react';
import GameInfo from './GameInfo';
import Square from './Square';
import GameLogic from '../GameLogic';

export default class Game extends React.Component {

  constructor() {
    super();

    // this.squareClick = this.squareClick.bind(this);
    // this.newGame     = this.newGame.bind(this);

    this.state =
      {
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
    this.setState (
      {
        board: board,
        turn: GameLogic.checkTurn(turn),
        winner: GameLogic.checkWinner(board)
        // gameState: GameLogic.checkGameState(board)
      }
    );
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
        <GameInfo turn={this.state.turn} winner={this.state.winner} resetAction={this.newGame.bind(this)} gameState={this.state.gameState} />
      </div>
    );
  }
};
