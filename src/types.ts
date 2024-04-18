export enum Cell {
  Empty = 0,
  Player = 1,
  AI = -1,
}

export type GameBoard = Cell[][];
