import { useCallback, useEffect, useState } from "react";
import runMiniMax from "./functions/findBestMove";
import { Cell, GameBoard } from "./types";
import Board from "./components/board";
import { Button } from "./components/ui/button";

export type GameModes = "player" | "computer" | "random";

function App() {
  const [gameMode, setGameMode] = useState<GameModes>(undefined);

  function endGame() {
    setGameMode(undefined);
  }

  return (
    <div className="w-screen h-screen overflow-hidden dark">
      <div className="px-3 text-zinc-300 py-2">
        <h1 className="text-3xl font-bold">
          Tic <span className="text-red-500">Tac</span> Toe
        </h1>
      </div>
      <div className="mx-auto mt-40">
        {gameMode !== undefined && <Board gameMode={gameMode} endGame={endGame} />}
      </div>

      {gameMode === undefined && (
        <div className="flex flex-col gap-2 lg:w-1/5 md:w-3/5 w-5/5 px-4 mx-auto ">
          <Button onClick={() => setGameMode("player")}>Start Game (Player First)</Button>
          <Button onClick={() => setGameMode("computer")}>Start Game (Computer First)</Button>
          <Button onClick={() => setGameMode("random")}>Start Game (Random)</Button>
        </div>
      )}
    </div>
  );
}

export default App;
