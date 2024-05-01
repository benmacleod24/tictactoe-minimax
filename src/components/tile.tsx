import { Cell } from "../types";
import { XIcon, CircleIcon } from "lucide-react";

export const TokenToIconMap: any = {
  [Cell.AI]: <XIcon size={60} />,
  [Cell.Player]: <CircleIcon size={50} />,
};

export default function Tile(props: { onClick: () => void; cell: Cell }) {
  return (
    <div
      className="md:w-40 md:h-40 w-28 h-28 bg-zinc-800 rounded-md text-zinc-100 flex items-center justify-center"
      onClick={(e) => {
        e.preventDefault();
        props.onClick();
      }}
    >
      {TokenToIconMap[props.cell]}
    </div>
  );
}
