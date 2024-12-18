import { Group as LayerGroup } from "ol/layer";
import { Tile as TileLayer } from "ol/layer";
import { OSM, XYZ } from "ol/source";

import { ILayerGroup, ITileLayer } from "../Interfaces";

/**
 * Create ol.Source for the ol.layer.Tile layer.
 */
export const CreateTileSource = (params: {
  sourceType: string;
  minZoom?: number;
  maxZoom?: number;
  url?: string;
  attributions?: string;
}): OSM | XYZ => {
  const { sourceType, minZoom, maxZoom, url, attributions } = params;
  switch (sourceType) {
    case "xyz":
      if (!url) {
        throw `URL is not defined for layer type ${sourceType}.`;
      }

      const xyzSource = new XYZ({ url });

      attributions && xyzSource.setAttributions(attributions);
      minZoom && maxZoom && xyzSource.setProperties({ minZoom, maxZoom });

      return xyzSource;

    case "osm":
    default:
      return new OSM();
  }
};

/**
 * Create ol.layer.Tile
 */
export const CreateTileLayer = (params: {
  name: string;
  title: string;
  groupName: string;
  sourceType: string;
  zoomExtent: [number, number];
  zIndex: number;
  visible: boolean;
  url?: string;
  extent?: number[];
  externalLink?: boolean;
}): TileLayer<OSM | XYZ> => {
  const {
    sourceType,
    name,
    groupName,
    title,
    zIndex,
    visible,
    zoomExtent,
    url,
    extent,
    externalLink,
  } = params;
  const layer = new TileLayer({
    source: CreateTileSource({
      sourceType: sourceType,
      url: url,
      attributions: "",
    }),
    properties: {
      name,
      title,
      groupName,
      externalLink,
    },
    extent: extent,
  });
  layer.setZIndex(zIndex);
  layer.setVisible(visible);
  return layer;
};

/**
 * @param {ILayerGroup} params Unique id for the ol.layer.Group
 */
export const CreateLayerGroup = (params: ILayerGroup): LayerGroup => {
  return new LayerGroup({
    properties: {
      name: params.name,
      title: params.title,
    },
    layers: [],
  });
};
