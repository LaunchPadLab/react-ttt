import React from 'react';

export default class Square extends React.Component {

  render() {

    const { clickHandler, value } = this.props;

    return (

      <div
        className="square"
        onClick={clickHandler}>

        {value}
      </div>
    );
  }
}
