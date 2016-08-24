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
  [2, 4, 8]
];

/**
 * Determines if the current move has won the game.
 *
 * @param {Array} board - The board
 * @param {string} turn - The current turn
 * @returns {String|undefined} The winner or undefined if there is none
 */
function getWinner(board, turn) {

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
