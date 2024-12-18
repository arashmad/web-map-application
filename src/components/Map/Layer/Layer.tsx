// A client component
"use client";

/* Import from React */
import { useEffect } from "react";

/* Import from ol */
import { Collection } from "ol";
import { OSM, XYZ } from "ol/source";
import { Group, Tile as TileLayer, Vector as VectorLayer } from "ol/layer";

/* Import Utility Functions */
import { CreateTileLayer } from "@/components/Map/utilities/Layer";
import { createVectorLayer } from "@/components/Map/utilities/VectorLayer";

/* Stores */
import useMapStore from "@/store/mapStore";

/* Types */
import {
  TileLayer as ITileLayer,
  VectorLayer as IVectorLayer,
} from "@/types/Layers";

// Component Interface with additional props
type ILayerComponent = (ITileLayer | IVectorLayer) & { groupName: string };

const LayerComponent: React.FC<ILayerComponent> = (props) => {
  const { type, name, title, sourceLink, zoom, zIndex, groupName } = props;

  /* Call map store using ZuStand*/
  const { mapObject } = useMapStore();

  useEffect(() => {
    console.log("Running useEffect...");
    console.log(mapObject.getLayers().getArray().length);
    if (mapObject) {
      let layer: TileLayer<OSM | XYZ> | VectorLayer;

      /**
       * Create a new ol.layer.* based on type.
       */
      if (type === "tileLayer") {
        // Tile layer props
        const { sourceType, description } = props;
        layer = CreateTileLayer({
          name: name,
          title: title,
          sourceType: sourceType,
          zIndex: zIndex,
          visible: true,
          zoomExtent: zoom,
          groupName: groupName,
        });
      } else if (type === "vectorLayer") {
        // Vector layer props
        const { geometry, geometryObject, externalLink, helper } = props;
        // layer = createVectorLayer();
      }

      /**
       * Add newly created ol.layer.* to its related group.
       */
      mapObject.getLayers().forEach((layerGr) => {
        if (layerGr instanceof Group && layerGr.get("name") === groupName) {
          const layersInGroupAsArray = layerGr.getLayers().getArray();
          const updatedLayers = [...layersInGroupAsArray];

          const ids = layersInGroupAsArray.map((el) => {
            return el.getZIndex() || 0;
          });

          /**
           * Find the index of the layer to be pushed to the group based on the index
           * In this way, the layers ordered by their zIndex to have a better view in
           * the layer manager.
           */
          const insertIndex = updatedLayers.findIndex(
            (el) => (el.getZIndex() || 0) > zIndex
          );
          if (insertIndex < 0) {
            updatedLayers.push(layer);
          } else {
            updatedLayers.splice(insertIndex, 0, layer);
          }

          layerGr.setLayers(new Collection(updatedLayers));
        }
      });

      return () => {
        if (mapObject) {
          mapObject.removeLayer(layer);
        }
      };
    }
  }, [mapObject, props]);

  return null;
};

export default LayerComponent;
