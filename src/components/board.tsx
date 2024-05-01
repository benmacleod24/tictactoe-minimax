import { useCallback, useEffect, useState } from "react";
import { Cell, GameBoard } from "../types";
import Tile, { TokenToIconMap } from "./tile";
import checkForWin, { isMovesLeft } from "../functions/isGameOver";
import isGameOver from "../functions/isGameOver";
import { AlarmSmoke, Circle, XIcon } from "lucide-react";
import findBestMove from "../functions/findBestMove";
import { GameModes } from "@/App";
import { Button } from "./ui/button";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

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

export default function Board(props: { gameMode: GameModes; endGame: () => void }) {
  const [board, setBoard] = useState(defaultGameBoard);
  const [gameState, setGameState] = useState<GameState>(GameState.InProgress);

  // Player clicks the cell.
  function onCellClick(x: number, y: number) {
    // Deep clone of the board.
    const _board = clone(board);

    // Check if the cell is empty.
    if (_board[x][y] === Cell.Empty) {
      // Set cell to the player.
      _board[x][y] = Cell.Player;

      // If there are moves left, run computers turn.
      if (isMovesLeft(_board)) {
        // Run minimax and get best move.
        const bestMove = findBestMove(clone(_board));
        // Set board move to cloned board.
        _board[bestMove.x][bestMove.y] = Cell.AI;
      }

      // Set the new board.
      setBoard(_board);
    }
  }

  // Monitor board state.
  useEffect(() => {
    // Check the game score.
    const gameScore = isGameOver(board);
    // Check if any moves are left.
    const movesLeft = isMovesLeft(board);

    // Determines a tie game.
    if (!movesLeft && gameScore === 0) {
      return setGameState(GameState.Tie);
    }

    // Game state is not a tie.
    if (gameScore !== 0) {
      if (gameScore === 10) return setGameState(GameState.Lose);
      if (gameScore === -10) return setGameState(GameState.Win);
    }
  }, [board]);

  // Monitor game mode.
  useEffect(() => {
    // Deep clone of the board.
    const _board = clone(defaultGameBoard);

    // Game mode was selected for computer.
    if (props.gameMode === "computer") {
      // Run minimax to find computer move.
      const bestMove = findBestMove(clone(_board));
      // Set computer move.
      _board[bestMove.x][bestMove.y] = Cell.AI;
      // Set the board and allow player to play.
      setBoard(_board);
      return;
    }

    // Game mode was selected for random.
    if (props.gameMode === "random") {
      // Options for gamemodes.
      const gameModes: GameModes[] = ["computer", "player"];
      // Random index from the game modes array.
      const randomInt = Math.floor(Math.random() * gameModes.length);

      // If the random game mode is computer, return minimax first.
      if (gameModes[randomInt] === "computer") {
        // Run minimax to find computer move.
        const bestMove = findBestMove(clone(_board));
        // Set computer move.
        _board[bestMove.x][bestMove.y] = Cell.AI;
        // Set the board and allow player to play.
        setBoard(_board);
        return;
      }
    }
  }, [props.gameMode]);

  return (
    <div className="flex flex-col">
      <div className="mx-auto">
        {board.map((r, x) => (
          <div key={x} className="flex items-center gap-2 my-2">
            {r.map((c, y) => (
              <Tile key={`${x}${y}`} cell={c} onClick={() => onCellClick(x, y)} />
            ))}
          </div>
        ))}
      </div>

      <div className="w-full px-4 space-y-3 mt-2 md:w-2/4 mx-auto lg:w-2/5">
        {/* Restart Button */}
        {props.gameMode && (
          <Button className="w-full" onClick={() => props.endGame()}>
            Restart Game
          </Button>
        )}

        {/* Game Lose Banner */}
        {gameState === GameState.Lose && (
          <Alert className="text-red-500 border-red-500">
            <AlertTitle>You Lose!</AlertTitle>
            <AlertDescription>The AI defeated you, and you won't defeat it.</AlertDescription>
          </Alert>
        )}

        {/* Game Tie Banner */}
        {gameState === GameState.Tie && (
          <Alert className="text-orange-500 border-orange-500">
            <AlertTitle>It's a Tie</AlertTitle>
            <AlertDescription>
              You Tied the computer, good job but you won't defeat it.
            </AlertDescription>
          </Alert>
        )}

        {/* Game Win Banner */}
        {gameState === GameState.Win && (
          <Alert className="text-green-500 border-green-500">
            <AlertTitle>Wow Your Won!</AlertTitle>
            <AlertDescription>
              Don't know how you won, because you shouldn't be able too.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
