"use client";

/* Styles */
import "ol/ol.css";
import "./Map.css";

/* Import from React */
import React, { useRef, useEffect } from "react";

/* Import from ol */
import { defaults as defaultControls, ScaleLine } from "ol/control";

/* Import Context Managers */
import useMapStore from "@/store/mapStore";

/* Types */
import { MapTypes, LayerTypes } from "@/types";
import { createMap } from "@/lib/Map";

/**
 * Map Options Interface.
 */
interface IMapOptions {
  /** Show map attribute */
  attribute?: boolean;
  /** Show zoom in/out control buttons */
  zoomControl?: boolean;
  /** Show scale bar on map */
  scaleBar?: boolean;
}

/**
 * Map Component Interface.
 */
interface IMap {
  /** Initiate map zoom level */
  zoom: number;
  /** Initiate map center */
  center: MapTypes.WebMercatorCoordinate;
  /** Initiate map layers */
  dataLayer: LayerTypes.TLayerGroup;
  /** Map options */
  options: IMapOptions;
  /** Explain me */
  topLeftFirst?: React.ReactNode;
  /** Explain me */
  topLeftSecond?: React.ReactNode;
  /** Explain me */
  children?: React.ReactNode;
}

const Map: React.FC<IMap> = ({
  zoom,
  center,
  dataLayer,
  options,
  children,
}) => {
  const { mapCtxInitialize } = useMapStore();

  const mapRef = useRef<HTMLDivElement | null>(null);

  // const { x, y } = center;

  /**
   * Options that ol.Map supports
   */
  const showAttribute =
    typeof options.attribute === "undefined" ? true : options.attribute;
  const showZoomControl =
    typeof options.zoomControl === "undefined" ? false : options.zoomControl;
  const showScaleBar =
    typeof options.scaleBar === "undefined" ? true : options.scaleBar;

  const mapControl = defaultControls({
    attribution: showAttribute,
    zoom: showZoomControl,
  });

  if (showScaleBar)
    mapControl.extend([
      new ScaleLine({
        units: "metric",
        bar: true,
        steps: parseInt("4", 10),
        text: true,
        minWidth: 140,
      }),
    ]);

  /**
   * Create an empty ol.Map instance
   */
  useEffect(() => {
    const map = createMap({
      zoom,
      center,
      dataLayer: dataLayer,
    });

    // const options = {
    //   view: new View({ zoom, center: [x, y] }),
    //   // layers: [
    //   //   new TileLayer({
    //   //     source: new OSM(),
    //   //   }),
    //   // ],
    //   layers: [],
    //   overlays: [],
    //   controls: mapControl,
    // };

    // const map = new OlMap(options);

    // Helps to see groups and layers
    // mapObject.on("click", () => {
    //   mapObject
    //     .getLayers()
    //     .getArray()
    //     .map((layerGr) => {
    //       if (layerGr instanceof Group) {
    //         console.log("");
    //         console.log("Group :", layerGr.get("id"));
    //         console.log("Layers :");
    //         layerGr
    //           .getLayers()
    //           .getArray()
    //           .map((lyr) => {
    //             console.log(lyr.get("id"));
    //           });
    //       }
    //     });
    // });

    // debugger;
    mapRef.current && map.setTarget(mapRef.current);
    mapCtxInitialize(map);

    // Cleanup: Unbind the map from the DOM element
    return () => {
      map.setTarget(undefined); // Unbind from DOM
      // mapObject.dispose(); // Dispose of the map properly
    };
  }, []);

  return (
    <div ref={mapRef} className="absolute inset-0" id="ol-map-container">
      {children}
    </div>
  );

  // useEffect(() => {
  //   const map = new OlMap({
  //     layers: [
  //       new TileLayer({
  //         source: new OSM(),
  //       }),
  //     ],
  //     view: new View({
  //       //Coordinate System: WGS 84 / Pseudo-Mercator-EPSG:3857
  //       center: [8546575.886939, 2137169.681579], // Longitude, Latitude
  //       zoom: 6,
  //     }),
  //   });

  //   mapRef.current && map.setTarget(mapRef.current);
  //   // on component unmount remove the map refrences to avoid unexpected behaviour
  //   return () => {
  //     map.setTarget(undefined);
  //   };
  // }, []);
  // return (
  //   <>
  //     <div ref={mapRef} className="absolute inset-0"></div>
  //   </>
  // );
};

export default Map;
