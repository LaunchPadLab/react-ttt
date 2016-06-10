import React from 'react';

export default class Square extends React.Component {

  render() {
    return (
      <div className="square" onClick={this.props.squareClick}>
        {this.props.value}
      </div>
    );
  }
};
