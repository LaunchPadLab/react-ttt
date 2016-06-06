import React from 'react';
import autobind from 'autobind-decorator';

@autobind
export default class Square extends React.Component {

  clickHandler() {
    this.props.squareClick(this.props.pos, this.props.turn);
  }

  render() {
    return (
      <div className="square" onClick={this.clickHandler}>
        {this.props.value}
      </div>
    );
  }
};
