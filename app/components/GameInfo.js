import React from 'react';
import GameLogic from '../GameLogic';

export default class GameInfo extends React.Component {

  render() {
    return (
      <div id='gameInfo'>
        <h3>{GameLogic.setGameTitle(this.props)}</h3>
        <button className='btn btn-primary' onClick={this.props.resetAction}>Start New Game</button>
      </div>
    );
  }
}
