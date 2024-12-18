export interface ILayerListItemClassifiedSymbolsLabel {
  label: string;
}

export interface ILayerListItemClassifiedSymbolsSymbol {
  color: string;
}

export interface ILayerListItemClassifiedSymbols {
  colors: string[];
  labels: string[];
}

export interface ILayerListItemSingleSymbol {
  color: string;
  label?: string;
}
