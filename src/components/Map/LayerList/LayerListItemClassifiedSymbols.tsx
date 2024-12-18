import "./LayerList.css";

import {
  ILayerListItemClassifiedSymbols,
  ILayerListItemClassifiedSymbolsLabel,
  ILayerListItemClassifiedSymbolsSymbol,
} from "./specification/interfaces";

const PixelSymbol: React.FC<ILayerListItemClassifiedSymbolsSymbol> = (
  props
) => {
  const { color } = props;

  return (
    <span
      className="mdi mdi-circle-slice-8 symbol"
      style={{ color: color }}
    ></span>
  );
};

const PixelLabel: React.FC<ILayerListItemClassifiedSymbolsLabel> = (props) => {
  const { label } = props;
  return <span className="label">{label}</span>;
};

const LayerListItemClassifiedSymbols: React.FC<
  ILayerListItemClassifiedSymbols
> = (props) => {
  const { colors, labels } = props;
  return (
    <>
      {colors?.map((c, i) => (
        <div className="legend-row" key={i}>
          <PixelSymbol color={c} />
          <PixelLabel label={labels[i]} />
        </div>
      ))}
    </>
  );
};

export default LayerListItemClassifiedSymbols;
