"use client";

/* Styles */
import "ol/ol.css";
import "./Map.css";

/* Import from React */
import React, { useRef, useEffect } from "react";

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

  /**
   * Options that ol.Map supports
   */
  const showAttribute =
    typeof options.attribute === "undefined" ? true : options.attribute;
  const showZoomControl =
    typeof options.zoomControl === "undefined" ? false : options.zoomControl;
  const showScaleBar =
    typeof options.scaleBar === "undefined" ? true : options.scaleBar;

  /**
   * Create an empty ol.Map instance
   */
  useEffect(() => {
    const map = createMap({
      zoom,
      center,
      dataLayer: dataLayer,
      showAttribution: showAttribute,
      showZoom: showZoomControl,
      showScaleBar: showScaleBar,
    });

    mapRef.current && map.setTarget(mapRef.current);
    mapCtxInitialize(map);

    // Cleanup: Unbind the map from the DOM element
    return () => {
      map.setTarget(undefined); // Unbind from DOM
      // mapObject.dispose(); // Dispose of the map properly
    };
  }, []);

  return (
    <div ref={mapRef} id="ol-map-container" className="ol-map">
      {children}
    </div>
  );
};

export default Map;
