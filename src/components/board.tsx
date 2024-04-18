import { useCallback, useEffect, useState } from "react";
import { Cell, GameBoard } from "../types";
import Tile, { TokenToIconMap } from "./tile";
import checkForWin, { isMovesLeft } from "../functions/isGameOver";
import isGameOver from "../functions/isGameOver";
import { AlarmSmoke, Circle, XIcon } from "lucide-react";
import findBestMove from "../functions/findBestMove";

export const clone = (items: any) => JSON.parse(JSON.stringify(items));

const defaultGameBoard: GameBoard = [
  [Cell.Empty, Cell.Empty, Cell.Empty],
  [Cell.Empty, Cell.Empty, Cell.Empty],
  [Cell.Empty, Cell.Empty, Cell.Empty],
];

export enum GameState {
  Win = "PLAYER_WINNER",
  Lose = "PLAYER_LOSER",
  Tie = "TIE",
  InProgress = "IN_PROGRESS",
}

export const GameStateToBanner: { [x: string]: { label: string; bg: string } } = {
  [GameState.Win]: {
    label: "You Win",
    bg: "bg-green-400",
  },
  [GameState.Lose]: {
    label: "You Lose!",
    bg: "bg-red-400",
  },
  [GameState.Tie]: {
    label: "It's a Tie!",
    bg: "bg-orange-400",
  },
} as const;

function timeout(delay: number) {
  return new Promise((res) => setTimeout(res, delay));
}

export default function Board(props: {}) {
  const [board, setBoard] = useState(defaultGameBoard);
  const [gameState, setGameState] = useState<GameState>(GameState.InProgress);

  function onCellClick(x: number, y: number) {
    const _board = clone(board);

    if (_board[x][y] === Cell.Empty) {
      _board[x][y] = Cell.Player;

      // alert(_board);

      if (isMovesLeft(_board)) {
        const bestMove = findBestMove(clone(_board));
        _board[bestMove.x][bestMove.y] = Cell.AI;
      }

      setBoard(_board);
    }
  }

  useEffect(() => {
    const gameScore = isGameOver(board);
    const movesLeft = isMovesLeft(board);

    if (!movesLeft && gameScore === 0) {
      return setGameState(GameState.Tie);
    }

    if (gameScore !== 0) {
      if (gameScore === 10) return setGameState(GameState.Lose);
      if (gameScore === -10) return setGameState(GameState.Win);
    }
  }, [board]);

  return (
    <div className="flex flex-col">
      <div className="relative">
        {board.map((r, x) => (
          <div key={x} className="flex items-center gap-2 my-2">
            {r.map((c, y) => (
              <Tile key={`${x}${y}`} cell={c} onClick={() => onCellClick(x, y)} />
            ))}
          </div>
        ))}
      </div>
      <div className="flex gap-10">
        <div className="flex gap-1 text-zinc-200 items-center">
          <p className="font-bold text-lg">AI:</p>
          <XIcon className="mt-0.5" />
        </div>
        <div className="flex gap-1 text-zinc-200 items-center">
          <p className="font-bold text-lg">Player:</p>
          <Circle className="mt-0.5" />
        </div>
      </div>
      <div className="mt-3">
        {gameState !== GameState.InProgress && (
          <div
            className={`w-full h-10  flex items-center justify-center rounded-md text-white font-semibold ${GameStateToBanner[gameState].bg}`}
          >
            {GameStateToBanner[gameState].label}
          </div>
        )}
      </div>
      <button
        onClick={() => {
          setBoard(defaultGameBoard);
          setGameState(GameState.InProgress);
        }}
      >
        Restart
      </button>
    </div>
  );
}
