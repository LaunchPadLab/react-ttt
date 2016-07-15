var ReactDOM = require('react-dom');
var React = require('react');

/********************/
/*                  */
/*    Game Logic    */
/*                  */
/********************/

/**
 * The winning conditions.
 *
 * @private
 */
var _winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

/**
 * Determines if the current move has won the game.
 *
 * @private
 * @param {Array} board - The board
 * @param {string} turn - The current turn
 * @returns {String|undefined} The winner or undefined if there is none
 */
function _getWinner(board, turn) {

  var indices = board.reduce(function(acc, val, idx) {
    return val === turn ? acc.concat(idx) : acc;
  }, []);

  var isWinner = _winningConditions.reduce(function(acc, condition) {
    return acc || condition.reduce(function(single, val) {
      return single && (indices.indexOf(val) !== -1);
    }, true);
  }, false);

  return isWinner ? turn : undefined;
}

/**
 * The public interface for Game Logic
 *
 */
var GameLogic = {

  /**
   * Returns the initial state of the game.
   *
   * @returns {Object} The initial state of the game
   */
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

  /**
   * Return the new state of the game.
   *
   * @param {Object} state - The current state of the game
   * @param {Integer} position - The index of the current move
   * @returns {Object} - The updated state of the game
   */
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

/****************************/
/*                          */
/*    React Tic Tac Toe!    */
/*                          */
/****************************/

/**
 * A helper so I don't have to type 'React.DOM' a gazillion times.
 *
 */
var h = React.DOM;

/**
 * React Component that represents one square on our board.
 *
 * @return {ReactElement} - A React Element that expects the following props:
 *
 *   clickHandler: {Function}
 *   value: {string}
 *
 */
var Square = React.createClass({

  render: function() {

    return h.div({
      className: 'square',
      onClick: this.props.clickHandler
    }, this.props.value);

    /**
     * Equivalent JSX
     *
     * <div
     *   className="square"
     *   onClick={this.props.clickHandler}>
     *
     *   {this.props.value}
     *
     * </div>
     */
  }
});

/**
 * React Component that represents our entire game.
 *
 * @return {ReactElement} - A React Element that will manage our game.
 */
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

    // I have to do this because inside of the function given to the
    // map function I won't have access to 'this'
    var clickHandler = this.clickHandler;

    // squares is an array of Square React elements corresponding
    // to each value in this.state.board
    var squares = this.state.board.map(function(square, idx) {

      function handleClick() {
        return clickHandler(idx);
      }

      return React.createElement(Square, {
        key: idx,
        idx: idx,
        value: square,
        clickHandler: handleClick
      });

      /**
       * Equivalent JSX
       *
       * <Square
       *   key={idx}
       *   idx={idx}
       *   value={square}
       *   clickHandler={handleClick} />
       */
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

    /**
     * Equivalent JSX
     *
     * <div>
     *
     *   <button
     *     className="btn btn-primary"
     *     onClick={this.newGame}>
     *     New Game
     *   </button>
     *
     *   <span style={{paddingLeft: '5px'}}>
     *     <b>{this.state.message}</b>
     *   </span>
     *
     *   <div id="board">
     *     {squares}
     *   </div>
     * </div>
     */
  }
});

/**
 * Create our React App
 *
 */
var reactApp = React.createElement(Game);

/**
 * Set the DOM destination for our React App
 *
 */
var rootElem = document.getElementById('app');

/**
 * Render our React app into the root element and watch the magic!
 *
 */
ReactDOM.render(reactApp, rootElem);
