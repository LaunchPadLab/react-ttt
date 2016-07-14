// I need the imports for Brunch
import ReactDOM from 'react-dom';
import React from 'react';

var winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 8]
];

function _getWinner(board, turn) {

  var indices = board.reduce(function(acc, val, idx) {
    return val === turn ? acc.concat(idx) : acc;
  }, []);

  var isWinner = winningConditions.reduce(function(acc, condition) {
    return acc || condition.reduce(function(single, val) {
      return single && (indices.indexOf(val) !== -1);
    }, true);
  }, false);

  return isWinner ? turn : undefined;
}

var GameLogic = {

  getInitialState: function() {
    return {
        board: [
          '','','',
          '','','',
          '','',''
        ],
        turn:       'X',
        winner:     null,
        inProgress: true,
        message:    'Player X goes first!'
      }
  },

  updateGame: function(state, position) {

    // If the game is not in progress, do change the state
    if (!state.inProgress || state.board[position] !== '') {
      return state;
    }

    // Create a new board and update it with the current turn
    var board = state.board.slice(0);
    board.splice(position, 1, state.turn);

    // Determine if someone won!
    var winner = _getWinner(board, state.turn);

    // If there is a winner
    if (winner) {
      return {
        board:      board,
        turn:       state.turn,
        winner:     winner,
        inProgress: false,
        message:    "Player " + winner + " won!"
      }
    }

    // If its a draw
    if (board.join('').length === 9) {
      return {
        board:      board,
        turn:       state.turn,
        winner:     state.winner,
        inProgress: false,
        message:    "It's a draw!"
      }
    }

    // Update the turn to the next player
    var turn = state.turn === 'X' ? 'O' : 'X';

    return {
      board:      board,
      turn:       turn,
      winner:     state.winner,
      inProgress: state.inProgress,
      message:    "Player " + turn + "'s turn"
    };
  }
};

var h = React.DOM;

var Square = React.createClass({

  render: function() {

    return h.div({
      className: 'square',
      onClick: this.props.clickHandler
    }, this.props.value);
  }
});

var Game = React.createClass({

  getInitialState: function() {
    return GameLogic.getInitialState();
  },

  clickHandler: function(position) {
    this.setState(GameLogic.updateGame(this.state, position));
  },

  newGame: function() {
    this.setState(GameLogic.getInitialState());
  },

  render: function() {

    var clickHandler = this.clickHandler;

    var squares = this.state.board.map(function(square, idx) {
      function handleClick() {
        return clickHandler(idx);
      }

      return React.createElement(Square,{
        key: idx,
        idx: idx,
        value: square,
        clickHandler: handleClick
      });
    });

    return h.div(null,

      h.button({
        className: 'btn btn-primary',
        onClick: this.newGame
      }, 'New Game'),

      h.span({
        style: {paddingLeft: '5px'}
      }, h.b(null, this.state.message)),

      h.div({
        id: 'board'
      }, squares)
    );
  }
});


ReactDOM.render(React.createElement(Game), document.getElementById('app'));
