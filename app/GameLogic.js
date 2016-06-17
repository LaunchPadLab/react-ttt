let GameLogic = {

  // getInitialState : function() {
  //   return (
  //     {
  //       board : [
  //                 '','','',
  //                 '','','',
  //                 '','',''
  //               ],
  //       turn : 'X',
  //       winner : undefined,
  //       gameState : 'not_started'
  //     }
  //   )
  // },

  setTitle : function(props) {
    const { winner, turn } = props;

    switch (winner) {
      case undefined:
        return `Player ${turn}'s turn`;
      case 'none':
        return "Draw Game";
      default:
        return `Player ${winner} won!`;
    }
  },

  checkTurn : function(turn) {
    return turn === 'X' ? 'O' : 'X';
  },

  checkWinner : function(board) {
    if (GameLogic.checkEqual(board[0]+board[1]+board[2])) return board[0];
    if (GameLogic.checkEqual(board[3]+board[4]+board[5])) return board[3];
    if (GameLogic.checkEqual(board[6]+board[7]+board[8])) return board[6];
    if (GameLogic.checkEqual(board[0]+board[3]+board[6])) return board[0];
    if (GameLogic.checkEqual(board[1]+board[4]+board[7])) return board[1];
    if (GameLogic.checkEqual(board[2]+board[5]+board[8])) return board[2];

    if (board.join('').length === 9) return 'none';
    return undefined;
  },

  checkEqual : function(s) {
    return s === 'XXX' || s === 'OOO';
  }
}

export default GameLogic;
