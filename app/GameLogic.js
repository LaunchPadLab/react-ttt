let GameLogic = {

  getInitialState : function() {
    return {
        board : [
                  '','','',
                  '','','',
                  '','',''
                ],
        turn : 'X',
        winner : undefined,
        gameState : 'not_started'
      }
  },

  checkGameState : function(state, position) {
    var { board, turn, gameState, winner } = state;

    winner = GameLogic.checkWinner(board);
    turn = GameLogic.checkTurn(turn);

    if ( (board[position] === 'X' || board[position] === 'O') || (winner !== undefined) ) return;

    board[position] = turn;

    if (winner !== undefined || (board.join('').length === 9)) {
      gameState = 'finished';
    } else if (winner === 'none' && (board.join('').length === 9)) {
      gameState = 'draw';
    } else if (board.includes('X') || board.includes('O')) {
      gameState = 'started';
    } else {
      gameState = 'not_started';
    }

    return { board, turn, winner, gameState }
  },

  setTitle : function(props) {
    const { winner, turn, gameState } = props;

    switch (gameState) {
      case 'draw':
        return "Draw Game";
      case 'started':
        return `Player ${turn}'s turn`;
      case 'finished':
       return `Player ${winner} won!`;
      default:
        return 'Start a new game!';
    }
  },

  checkTurn : function(turn) {
    return turn === 'X' ? 'O' : 'X';
  },

  checkWinner : function(board) {
    // horizontals
    if (GameLogic.checkEqual(board[0]+board[1]+board[2])) return board[0];
    if (GameLogic.checkEqual(board[3]+board[4]+board[5])) return board[3];
    if (GameLogic.checkEqual(board[6]+board[7]+board[8])) return board[6];
    // verticals
    if (GameLogic.checkEqual(board[0]+board[3]+board[6])) return board[0];
    if (GameLogic.checkEqual(board[1]+board[4]+board[7])) return board[1];
    if (GameLogic.checkEqual(board[2]+board[5]+board[8])) return board[2];
    // diagonals
    if (GameLogic.checkEqual(board[0]+board[4]+board[8])) return board[0];
    if (GameLogic.checkEqual(board[2]+board[4]+board[6])) return board[2];

    if (board.join('').length === 9) return 'none';
    return undefined;
  },

  checkEqual : function(s) {
    return s === 'XXX' || s === 'OOO';
  }
}

export default GameLogic;
