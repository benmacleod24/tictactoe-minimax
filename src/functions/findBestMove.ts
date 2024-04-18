import { clone } from "../components/board";
import { Cell, GameBoard } from "../types";
import minimax from "./miniMax";

export default function findBestMove(board: GameBoard) {
  let bestScore = -Infinity;
  let bestMove = {
    x: 999,
    y: -999,
  };

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (board[r][c] === Cell.Empty) {
        const newBoard = clone(board);
        newBoard[r][c] = Cell.AI;
        let newScore = minimax(newBoard, 0, false);

        console.log(`(${r},${c}), Score: ${newScore}`);

        if (newScore > bestScore) {
          bestScore = newScore;
          bestMove = {
            x: r,
            y: c,
          };
        }
      }
    }
  }

  return bestMove;
}
