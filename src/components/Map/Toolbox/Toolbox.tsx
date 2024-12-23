"use client";

import { GeoJSON } from "ol/format";

import { Button } from "@/components/ui/button";
import { Minus, Plus, SquareDashed, MapPinPlus } from "lucide-react";
import SearchBar from "../SearchBar/SearchBar";

/**
 * Component Interface.
 */
interface IToolbox {
  zoomIn: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  zoomOut: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  drawPolygon: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  pinPoint: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  searchLocation: (places: GeoJSON | null) => void;
}

/**
 * Component Body.
 */
const Toolbox: React.FC<IToolbox> = (props) => {
  const { zoomIn, zoomOut, drawPolygon, pinPoint, searchLocation } = props;

  return (
    <div className="flex flex-col gap-1">
      <SearchBar />
      <Button
        size="icon"
        title="Zoom In"
        className="bg-slate-400 text-black"
        onClick={zoomIn}
      >
        <Plus />
      </Button>
      <Button
        size="icon"
        title="Zoom Out"
        className="bg-slate-400 text-black"
        onClick={zoomOut}
      >
        <Minus />
      </Button>
      <Button
        size="icon"
        title="Draw Polygon"
        className="bg-slate-400 text-black"
        onClick={drawPolygon}
      >
        <SquareDashed />
      </Button>
      <Button
        size="icon"
        title="Pin Point"
        className="bg-slate-400 text-black"
        onClick={pinPoint}
      >
        <MapPinPlus />
      </Button>
    </div>
  );
};

export default Toolbox;
