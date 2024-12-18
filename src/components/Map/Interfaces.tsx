export interface ILayerGroup {
  name: string;
  title: string;
}

export interface ILayerProperties {
  id: string;
  label: string;
  groupId: string;
  zIndex: number;
  visible: boolean;
}

/**
 * Interface for the Point Vector Layer Style
 */
export interface IPointStyle {
  radius?: number;
  fillColor?: string;
  strokeColor?: string;
  border?: number;
  label?: string;
  labelPosition?: "top" | "bottom";
}

export interface IVectorStyle {
  pointStyle: IPointStyle;
}

/**
 * Interface for the Point Vector Layer
 */
export interface IPointLayer {
  id: string;
  groupId: string;
  label: string;
  zIndex: number;
  visible: boolean;
  geometry: IGeoJSONObject;
  style: IPointStyle;
}

/**
 * Interface for the Tile Layer
 */
export interface ITileLayer {
  /** Tile layer type */
  type: string;
  /** Tile layer unique id */
  id: string;
  /** Tile layer group id it belongs to*/
  groupId: string;
  /** Tile layer label for UI/UX */
  label: string;
  /** Tile layer z-index for rendering according to the ol.layer.Tile `zIndex`*/
  zIndex: number;
  /** Tile layer visibility according to the ol.layer.Tile `visible` */
  visible: boolean;
  /** Tile layer source url according to the ol.source.XYZ `url` */
  url?: string;
  /** Tile layer extent according to the ol.layer.Tile `extent` */
  extent?: number[];
  /** Show external link button in layer list */
  externalLink?: boolean;
}

/**
 * Interface for the Point Vector Layer Component
 * <PointLayer/>
 */
export interface IPointLayerComponent {
  id: string;
  label: string;
  zIndex: number;
  visible: boolean;
  groupId: string;
  groupLabel: string;
  groupZIndex: number;
  geometry: IGeoJSONObject;
  style: IPointStyle;
}

/**
 * Interface for the GeoJSON Object
 */
export interface IGeoJSONObject {
  type: string;
  features: IFeature[];
}

/**
 * Interface for the GeoJSON Object Feature
 */
export interface IFeature {
  type: string;
  properties: IProperties;
  geometry: IPointGeometry | IPolygonGeometry;
}

/**
 * Interface for the GeoJSON Object Feature Geometry of type Point
 */
export interface IPointGeometry {
  coordinates: number[];
  type: string;
}

/**
 * Interface for the GeoJSON Object Feature Geometry of type Polygon
 */
export interface IPolygonGeometry {
  coordinates: number[][][];
  type: string;
}

export interface IProperties {}
