import { Cell, GameBoard } from "../types";

export default function isGameOver(board: GameBoard) {
  // Check Horizantal
  for (let i = 0; i < 3; i++) {
    if (board[i][0] !== Cell.Empty && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
      if (board[i][0] === Cell.AI) return 10;
      if (board[i][0] === Cell.Player) return -10;
    }
  }

  // Check Vertical
  for (let i = 0; i < 3; i++) {
    if (board[0][i] !== Cell.Empty && board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
      if (board[0][i] === Cell.AI) return 10;
      if (board[0][i] === Cell.Player) return -10;
    }
  }

  // Check Diagonal - Top Left -> Bottom Right
  if (board[0][0] !== Cell.Empty && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
    if (board[0][0] === Cell.AI) return 10;
    if (board[0][0] === Cell.Player) return -10;
  }

  // Check Diagonal - Bottom Left -> Top Right
  if (board[2][0] !== Cell.Empty && board[2][0] === board[1][1] && board[2][0] === board[0][2]) {
    if (board[2][0] === Cell.AI) return 10;
    if (board[2][0] === Cell.Player) return -10;
  }

  return 0;
}

export function isMovesLeft(board: GameBoard) {
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (board[r][c] === Cell.Empty) {
        return true;
      }
    }
  }

  return false;
}
