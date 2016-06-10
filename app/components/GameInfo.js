import React from 'react';

export default class GameInfo extends React.Component {

  render() {
    const { winner, turn, resetAction } = this.props;

    let content;
    switch (winner) {
      case undefined:
        content = `Player ${turn}'s turn`;
        break;
      case 'none':
        content = "Draw Game";
        break;
      default:
        content = `Player ${winner} won!`;
    }

    return (
      <div id='gameInfo'>
        <h3>{content}</h3>
        <button className='btn btn-primary' onClick={resetAction}>Start New Game</button>
      </div>
    );
  }
}
