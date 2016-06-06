import React from 'react';
import autobind from 'autobind-decorator';

@autobind
export default class GameInfo extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div id='gameInfo'>
        <h3 className={this.props.winner === undefined ? 'visible' : 'hidden'}>Player {this.props.turn}'s turn.</h3>
        <h3 className={(this.props.winner === undefined) || (this.props.winner === 'complete') ? 'hidden' : 'visible'}>Player {this.props.winner} won!</h3>
        <h3 className={this.props.winner === 'complete' ? 'visible' : 'hidden'}>Draw Game :(</h3>
        <button className='btn btn-primary' onClick={this.props.resetAction}>Start New Game</button>
      </div>
    );
  }
}
