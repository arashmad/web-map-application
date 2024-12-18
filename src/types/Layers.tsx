/**
 * Base layer type shared by all layers
 */
interface LayerBase {
  name: string;
  title: string;
  sourceLink?: string;
  zoom: [number, number];
  zIndex: number;
}

/**
 * TileLayer interface extending the base layer
 */
export interface TileLayer extends LayerBase {
  type: "tileLayer";
  sourceType: "osm" | "xyz";
  description?: string;
}

/**
 * VectorLayer interface extending the base layer
 */
export interface VectorLayer extends LayerBase {
  type: "vectorLayer";
  geometry: "Point" | "Polygon";
  geometryObject: any;
  externalLink?: boolean;
  helper?: string;
}

/**
 * Define all possible layer types using a union
 */
export type TLayer = TileLayer | VectorLayer;

/**
 * A group of layers.
 *
 * @property {TileLayer[]} baseMaps Base maps.
 * @property {Layer[]} overlays Overlays.
 * @property {Layer[]} userLayers User layers.
 *
 * @example
 */

interface Groups {
  name: string;
  title: string;
  layers: TLayer[];
}

/**
 * Make it all together
 */
interface LayerGroup {
  groups: Groups[];
}

/**
 * Export as a type
 */
export type TLayerGroup = LayerGroup;

const testLayer: TLayerGroup = {
  groups: [
    {
      title: "Base Maps",
      name: "base-maps",
      layers: [
        {
          zIndex: 0,
          name: "osm",
          title: "Open Street Map",
          type: "tileLayer",
          sourceType: "osm",
          zoom: [1, 23],
        },
        {
          zIndex: 1,
          name: "esri-sat",
          title: "Esri Satellite",
          sourceType: "xyz",
          type: "tileLayer",
          sourceLink:
            "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
          zoom: [1, 23],
          description:
            "World Satellite Imagery <a target='_blank' href='https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer'> Map Service </a>Powered by © <a target='_blank' href='https://developers.arcgis.com/documentation/mapping-apis-and-services/maps/basemap-layers'> ESRI ArcGIS </a>. By using ERSI based maps, you already agreed on <a target='_blank' href='https://developers.arcgis.com/documentation/mapping-apis-and-services/deployment/terms-of-use/'> ESRI data layer Terms of Use </a>.",
        },
        {
          zIndex: 2,
          name: "esri-topo",
          title: "Esri Topography",
          type: "tileLayer",
          sourceType: "xyz",
          sourceLink:
            "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
          zoom: [1, 23],
          description:
            "World Topography <a target='_blank' href='https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer'> Map Service </a> Powered by © <a target='_blank' href='https://developers.arcgis.com/documentation/mapping-apis-and-services/maps/basemap-layers'> ESRI ArcGIS </a>. By using ERSI based maps, you already agreed on <a target='_blank' href='https://developers.arcgis.com/documentation/mapping-apis-and-services/deployment/terms-of-use/'> ESRI data layer Terms of Use </a>.",
        },
      ],
    },
    {
      title: "Overlay Layers",
      name: "overlay-layers",
      layers: [
        {
          zIndex: 2,
          name: "results-1",
          title: "Results 1",
          type: "tileLayer",
          sourceType: "xyz",
          zoom: [10, 23],
        },
      ],
    },
    {
      title: "User Defined",
      name: "user-layers",
      layers: [
        {
          zIndex: 1,
          name: "user-aoi",
          title: "Area of Interest",
          type: "vectorLayer",
          geometry: "Polygon",
          geometryObject: {},
          externalLink: false,
          helper: "",
          zoom: [10, 23],
        },
      ],
    },
  ],
};
