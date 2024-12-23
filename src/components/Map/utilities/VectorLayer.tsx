import { GeoJSON } from "ol/format";
import VectorSource from "ol/source/Vector";
import { Vector as VectorLayer } from "ol/layer";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";

/* Import Utils*/
import { transformGeojsonObject } from "./Transformation";

import {
  // ILayerGroup,
  // IPointLayer,
  // IPointStyle,
  IGeoJSONObject,
  ILayerProperties,
} from "../Interfaces";

/**
 * Create ol.Style for point geometry type
 * @param {number} radius Point display size, default is `8`
 * @param {string} fillColor Point fill color rgba/hex, default is `#FF0000`
 * @param {number} border Point border size, default is `0`
 * @param {string} strokeColor Point border color rgba/hex, default is `rgba(0, 0, 0, 0)`
 * @param {string} label Point label
 * @param {string} labelAnchor Point label placement
 */
export const CreatePointStyle = (
  radius: number = 8,
  fillColor: string = "#FF0000",
  strokeColor: string = "rgba(0, 0, 0, 0)",
  border: number = 0,
  label?: string,
  labelAnchor?: "top" | "bottom"
): Style => {
  return new Style({
    image: new CircleStyle({
      radius: radius,
      fill: new Fill({
        color: fillColor,
      }),
      stroke: new Stroke({
        width: border,
        color: strokeColor,
      }),
    }),
  });
};

/**
 * Create ol.Style for polygon geometry type
 * @param {string} fillColor polygon fill color rgba/hex, default is `rgba(0, 0, 0, 0)"`
 * @param {number} borderSize polygon border size, default is `1.5`
 * @param {string} borderColor polygon border color rgba/hex, default is `rgba(0, 0, 0, 0)`
 * @param {number[]} borderStyle polygon border style, default is `[]`
 * @param {string} label Polygon label
 */
export const CreatePolygonStyle = (
  fillColor: string = "rgba(0, 0, 0, 0.2)",
  borderSize: number = 1.5,
  borderColor: string = "rgba(0, 0, 0)",
  borderStyle: number[] = [],
  label?: string
): Style => {
  const fill = new Fill({
    color: fillColor,
  });
  const stroke = new Stroke({
    color: borderColor,
    width: borderSize,
    lineDash: borderStyle,
  });
  return new Style({
    fill: fill,
    stroke: stroke,
  });
};

/**
 * Create ol.source.Vector for point vector layer
 * @param {IGeoJSONObject} geomObject Point geometry object
 */
export const CreatePointVectorSource = (
  geomObject: IGeoJSONObject
): VectorSource => {
  const GeoJSONObject3857 = transformGeojsonObject(geomObject);
  return new VectorSource({
    features: new GeoJSON().readFeatures(GeoJSONObject3857),
  });
};

/**
 * Create ol.source.Vector for polygon vector layer
 * @param {IGeoJSONObject} geomObject Polygon geometry object
 */
export const CreatePolygonVectorSource = (
  geomObject: IGeoJSONObject
): VectorSource => {
  const GeoJSONObject3857 = transformGeojsonObject(geomObject);
  return new VectorSource({
    features: new GeoJSON().readFeatures(GeoJSONObject3857),
  });
};

/**
 * Create ol.layer.Vector
 * @param {string} type Geometry type
 * @param {IGeoJSONObject} geomObject Geometry object
 * @param {Style} style Vector style
 * @param {ILayerProperties} properties Layer properties
 */
export const createVectorLayer = (
  type: "Point" | "Polygon",
  geomObject: IGeoJSONObject,
  style: Style,
  properties: ILayerProperties
): VectorLayer => {
  let source: VectorSource;
  switch (type) {
    case "Point":
      source = CreatePointVectorSource(geomObject);
      break;
    case "Polygon":
    default:
      source = CreatePolygonVectorSource(geomObject);
      break;
  }

  const layer = new VectorLayer({
    source: source,
    style: style,
    properties: {
      name: properties.name,
      title: properties.title,
      groupName: properties.groupName,
    },
  });

  layer.setZIndex(properties.zIndex);
  layer.setVisible(properties.visible);
  return layer;
};
