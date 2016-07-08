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

    const { board, gameState, turn, winner } = this.state;

    return (
      <div>
        {
          gameState ?

            <div id="game">

              {board.map((square, pos) =>

                <Square
                  key={pos}
                  value={square}
                  clickHandler={this.clickHandler.bind(this, pos)} />
              )}
            </div>

          : null
        }

        <GameInfo
          turn={turn}
          winner={winner}
          resetAction={this.newGame.bind(this)}
          gameState={gameState} />
      </div>
    );
  }
}
