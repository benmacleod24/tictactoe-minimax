import { clone } from "../components/board";
import { Cell, GameBoard } from "../types";
import isGameOver, { isMovesLeft } from "./isGameOver";

export default function minimax(board: GameBoard, depth: number, isMax: boolean): number {
  const gameState = isGameOver(board);
  const movesLeft = isMovesLeft(board);

  // AI Won
  if (gameState === 10) {
    return 10 - depth;
  }

  // Player Won
  if (gameState === -10) {
    return depth - 10;
  }

  // Tie Game
  if (!movesLeft && gameState === 0) {
    return 0;
  }

  if (isMax) {
    let bestScore = -Infinity;

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (board[r][c] === Cell.Empty) {
          const cBoard = clone(board);
          cBoard[r][c] = Cell.AI;
          bestScore = Math.max(minimax(cBoard, depth + 1, false), bestScore);
        }
      }
    }

    return bestScore;
  } else {
    let bestScore = Infinity;

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (board[r][c] === Cell.Empty) {
          const cBoard = clone(board);
          cBoard[r][c] = Cell.Player;
          bestScore = Math.min(minimax(cBoard, depth + 1, true), bestScore);
        }
      }
    }

    return bestScore;
  }
}
