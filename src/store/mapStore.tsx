/* ZuStand for managing states in app */
import { create } from "zustand";

/* Import from ol */
import { Map } from "ol";
import { fromLonLat } from "ol/proj";

/* Types */
import { MapTypes, LayerTypes } from "../types";

/* Utils */
import { createMap } from "@/lib/Map";

/* Initial values for map */
const mapInitZoom = 13;
const mapInitCenterGeographic: MapTypes.GeographicCoordinate = {
  long: 13.0635935,
  lat: 52.3934839,
};
const mapInitCenterWebMercator: MapTypes.WebMercatorCoordinate = {
  x: fromLonLat([mapInitCenterGeographic.long, mapInitCenterGeographic.lat])[0],
  y: fromLonLat([mapInitCenterGeographic.long, mapInitCenterGeographic.lat])[1],
};
const mapInitLayerGroups: LayerTypes.TLayerGroup = {
  groups: [
    {
      name: "base-maps",
      title: "Base Maps",
      layers: [
        {
          name: "osm",
          title: "Open Street Map",
          zIndex: 0,
          type: "tileLayer",
          sourceType: "osm",
          zoom: [1, 23],
        },
        {
          name: "esri-sat",
          title: "Esri Satellite",
          zIndex: 1,
          sourceType: "xyz",
          type: "tileLayer",
          sourceLink:
            "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
          zoom: [1, 23],
          description:
            "World Satellite Imagery <a target='_blank' href='https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer'> Map Service </a>Powered by © <a target='_blank' href='https://developers.arcgis.com/documentation/mapping-apis-and-services/maps/basemap-layers'> ESRI ArcGIS </a>. By using ERSI based maps, you already agreed on <a target='_blank' href='https://developers.arcgis.com/documentation/mapping-apis-and-services/deployment/terms-of-use/'> ESRI data layer Terms of Use </a>.",
        },
        {
          name: "esri-topo",
          title: "Esri Topography",
          zIndex: 2,
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
      name: "overlay-layers",
      title: "Overlay Layers",
      layers: [],
    },
    {
      name: "user-layers",
      title: "User Defined",
      layers: [],
    },
  ],
};
const initialProps = {
  zoom: mapInitZoom,
  center: mapInitCenterWebMercator,
  layerGroups: mapInitLayerGroups,
  map: new Map(),
};

/**
 * Interface for a map store, which manages map-related data and interactions.
 */
interface MapStoreInterface {
  /* Map object and its properties */
  mapObject: Map;
  mapInitiateZoom: number;
  mapInitiateCenter: MapTypes.WebMercatorCoordinate;
  mapInitiateLayerGroups: LayerTypes.TLayerGroup;
  /* Map events functions */
  mapCtxInitialize: (map: Map) => void;
  /* Map interaction functions */
  mapZoomIn: () => void;
  mapZoomOut: () => void;
}

const useMapStore = create<MapStoreInterface>((set) => ({
  mapObject: initialProps.map,
  mapInitiateZoom: initialProps.zoom,
  mapInitiateCenter: initialProps.center,
  mapInitiateLayerGroups: initialProps.layerGroups,

  /**
   * Initialize Map
   */
  mapCtxInitialize: (map) => set({ mapObject: map }),

  /**
   * Handling ZoomIn interaction
   */
  mapZoomIn: () =>
    set((state) => {
      const view = state.mapObject.getView();
      const zoom = view.getZoom();
      if (zoom)
        view.animate({
          zoom: zoom + 0.5,
          duration: 300,
        });
      return state;
    }),

  /**
   * Handling ZoomOut interaction
   */
  mapZoomOut: () =>
    set((state) => {
      const view = state.mapObject.getView();
      const zoom = view.getZoom();
      if (zoom)
        view.animate({
          zoom: zoom - 0.5,
          duration: 300,
        });
      return state;
    }),
}));

export default useMapStore;
