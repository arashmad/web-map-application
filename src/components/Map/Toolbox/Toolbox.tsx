"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

/**
 * Component Interface.
 */
interface IToolbox {
  zoomIn: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  zoomOut: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

/**
 * Component Body.
 */
const Toolbox: React.FC<IToolbox> = (props) => {
  const { zoomIn, zoomOut } = props;

  return (
    <div className="flex flex-col gap-1">
      <Button
        className="bg-[var(--color-light-blue)]"
        size="icon"
        onClick={zoomIn}
      >
        <Plus />
      </Button>
      <Button
        className="bg-[var(--color-light-blue)]"
        size="icon"
        onClick={zoomOut}
      >
        <Minus />
      </Button>
    </div>
  );
};

export default Toolbox;
