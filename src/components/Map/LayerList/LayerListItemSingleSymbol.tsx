import "./LayerList.css";

import { ILayerListItemSingleSymbol } from "./specification/interfaces";

const LayerListItemSingleSymbol: React.FC<ILayerListItemSingleSymbol> = (
  props
) => {
  const { color } = props;

  return (
    <div className="layer-group-item-legend-panel-item">
      <span
        className="mdi mdi-circle-slice-8 mdi-14px"
        style={{ color: color }}
      ></span>
    </div>
  );
};

export default LayerListItemSingleSymbol;
