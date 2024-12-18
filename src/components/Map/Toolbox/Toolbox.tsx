"use client";

import { useState } from "react";

/**
 * Component Interface.
 */
interface IToolbox {
  zoomIn: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  zoomOut: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  toggleLayerList?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  downloadResults?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

/**
 * Component Body.
 */
const Toolbox: React.FC<IToolbox> = (props) => {
  const { zoomIn, zoomOut, toggleLayerList, downloadResults } = props;

  const [isLayerListOn, setIsLayerListOn] = useState(true);

  const onToggleLayerList = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setIsLayerListOn((prevState) => !prevState);
    // toggleLayerList(e);
  };

  return (
    <div className="d-flex flex-column justify-content-center p-1 bg-slate-100 rounded-lg">
      {/* <IconButton
        name="mdi-plus"
        size="sm"
        color="#000"
        className="bg-[#ffb703]"
        helper="zoom in"
        onClick={zoomIn}
      />
      <IconButton
        name="mdi-minus"
        size="sm"
        color="#000"
        className="bg-[#ffb703]"
        helper="zoom out"
        onClick={zoomOut}
      />
      <IconButton
        name={isLayerListOn ? "mdi-layers" : "mdi-layers-off"}
        size="sm"
        color="#000"
        className="bg-[#ffb703]"
        helper="Toggle layer list on/off"
        onClick={onToggleLayerList}
      />
      <IconButton
        name="mdi-download"
        size="sm"
        color="#000"
        className="bg-[#ffb703]"
        helper="Download results of current workspace"
        onClick={downloadResults}
      /> */}
    </div>
  );
};

export default Toolbox;
