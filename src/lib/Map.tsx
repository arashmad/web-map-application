// Import node packages
import { Map, View } from "ol";
import { Group as LayerGroup } from "ol/layer";
import { defaults as defaultControls, ScaleLine } from "ol/control";

/* Types */
import { MapTypes, LayerTypes } from "@/types";
import { CreateTileLayer } from "@/components/Map/utilities/Layer";
import { createVectorLayer } from "@/components/Map/utilities/VectorLayer";
import { Style } from "ol/style";

/**
 * Creates an OpenLayers map object with the given configuration.
 */
export const createMap = (params: {
  zoom: number;
  center: MapTypes.WebMercatorCoordinate;
  dataLayer: LayerTypes.TLayerGroup;
  showAttribution?: boolean;
  showZoom?: boolean;
  showScaleBar?: boolean;
}): Map => {
  const { zoom, center, dataLayer, showAttribution, showZoom, showScaleBar } =
    params;

  const layerGroup = dataLayer.groups.map((gr) => {
    const layers = gr.layers.map((layer) => {
      return layer.type === "tileLayer"
        ? CreateTileLayer({
            name: layer.name,
            title: layer.title,
            groupName: gr.name,
            sourceType: layer.sourceType,
            url: layer.sourceLink,
            zoomExtent: layer.zoom,
            zIndex: layer.zIndex,
            visible: true,
          })
        : createVectorLayer(
            layer.geometry,
            layer.geometryObject,
            new Style({}),
            {
              id: layer.name,
              label: layer.title,
              groupId: gr.name,
              zIndex: layer.zIndex,
              visible: true,
            }
          );
    });
    return new LayerGroup({
      layers: layers,
      properties: {
        name: gr.name,
        title: gr.title,
      },
    });
  });

  const controls = defaultControls({
    attribution: showAttribution,
    zoom: showZoom,
  });

  if (showScaleBar) {
    controls.extend([
      new ScaleLine({
        units: "metric",
        bar: true,
        steps: parseInt("4", 10),
        text: true,
        minWidth: 140,
      }),
    ]);
  }

  const map = new Map({
    target: "ol-map-container",
    view: new View({
      zoom: zoom,
      center: [center.x, center.y],
    }),
    layers: layerGroup,
    controls: controls,
  });

  // Helps to see groups and layers
  map.on("click", () => {
    map
      .getLayers()
      .getArray()
      .map((layerGr) => {
        if (layerGr instanceof LayerGroup) {
          console.log("");
          console.log("Group :", layerGr.get("id"));
          console.log("Layers :");
          layerGr
            .getLayers()
            .getArray()
            .map((lyr) => {
              console.log(lyr.get("id"));
            });
        }
      });
  });

  return map;
};
