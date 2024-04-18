import { useCallback, useEffect, useState } from "react";
import runMiniMax from "./functions/findBestMove";
import { Cell, GameBoard } from "./types";
import Board from "./components/board";

function App() {
  return (
    <div className="w-screen h-screen bg-zinc-900 overflow-hidden">
      <div className="mx-auto w-fit mt-40">
        <Board />
      </div>
    </div>
  );
}

export default App;
