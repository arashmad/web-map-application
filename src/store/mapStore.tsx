/* ZuStand for managing states in app */
import { create } from "zustand";

/* Import from ol */
import { Map, Feature } from "ol";
import { Draw } from "ol/interaction";
import { GeoJSON } from "ol/format";
import { Vector as VectorSource } from "ol/source";
import { Vector as VectorLayer } from "ol/layer";
import { fromLonLat } from "ol/proj";

/* Types */
import { MapTypes, LayerTypes } from "../types";
import { createInteractionDraw } from "@/components/Map/utilities/Interactions";
import {
  CreatePointStyle,
  CreatePolygonStyle,
  createVectorLayer,
} from "@/components/Map/utilities/VectorLayer";
import { addLayer } from "@/components/Map/utilities";

/* Utils */

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
  drawPolygon: () => void;
  pinPoint: () => void;
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

  /**
   * Handling drawPolygon interaction
   */
  drawPolygon: () =>
    set((state) => {
      const groupName = "user-layers";
      const polygonDraw = createInteractionDraw("Polygon");
      polygonDraw.on("drawend", async (e) => {
        const geom4326 = e.feature
          ?.getGeometry()
          ?.clone()
          ?.transform("EPSG:3857", "EPSG:4326");
        const polygon = new GeoJSON().writeFeature(
          new Feature({ geometry: geom4326 })
        );

        const polygonGeojson = {
          type: "FeatureCollection",
          features: [JSON.parse(polygon)],
        };
        const polygonVectorLayer = createVectorLayer(
          "Polygon",
          polygonGeojson,
          CreatePolygonStyle(),
          {
            name: "polygon",
            title: "Polygon",
            groupName: groupName,
            zIndex: 10,
            visible: true,
          }
        );
        addLayer(state.mapObject, polygonVectorLayer, groupName);
        state.mapObject.removeInteraction(polygonDraw);
      });

      state.mapObject.addInteraction(polygonDraw);
      return state;
    }),

  pinPoint: () =>
    set((state) => {
      const groupName = "user-layers";
      const pointDraw = createInteractionDraw("Point");

      pointDraw.on("drawend", async (e) => {
        const geom4326 = e.feature
          ?.getGeometry()
          ?.clone()
          ?.transform("EPSG:3857", "EPSG:4326");
        const point = new GeoJSON().writeFeature(
          new Feature({ geometry: geom4326 })
        );

        const pointGeojson = {
          type: "FeatureCollection",
          features: [JSON.parse(point)],
        };
        const pointVectorLayer = createVectorLayer(
          "Point",
          pointGeojson,
          CreatePointStyle(),
          {
            name: "point",
            title: "Point",
            groupName: groupName,
            zIndex: 10,
            visible: true,
          }
        );
        addLayer(state.mapObject, pointVectorLayer, groupName);
        state.mapObject.removeInteraction(pointDraw);
      });

      state.mapObject.addInteraction(pointDraw);
      return state;
    }),
}));

export default useMapStore;
