/* Import from React */
import { useEffect } from "react";

/* Import from ol */
import { Collection } from "ol";
import { Group } from "ol/layer";

/* Import Utility Functions */
import { CreateTileLayer } from "../utilities/Layer";

/* Stores */
import useMapStore from "@/store/mapStore";

/**
 * Component Interface.
 */
export interface ITileLayerComponent {
  /** Explain me */
  type: string;
  /** Explain me */
  id: string;
  /** Explain me */
  label: string;
  /** Explain me */
  zIndex: number;
  /** Explain me */
  visible: boolean;
  /** Explain me */
  groupId: string;
}

const TileLayer: React.FC<ITileLayerComponent> = (props) => {
  const { type, id, label, zIndex, visible, groupId } = props;

  const { mapObject } = useMapStore();

  useEffect(() => {
    if (mapObject) {
      /**
       * Create a new ol.layer.TileLayer.
       */
      const tileLayer = CreateTileLayer({
        type,
        id,
        label,
        groupId,
        zIndex,
        visible,
      });

      /**
       * Add newly created ol.layer.TileLayer to its related group.
       */
      mapObject
        .getLayers()
        .getArray()
        .map((layerGr) => {
          if (layerGr instanceof Group) {
            if (layerGr.get("id") === groupId) {
              const layersInGroup = layerGr.getLayers();

              const layersInGroupAsArray = layersInGroup.getArray();
              const ids = layersInGroupAsArray.map((el) => {
                return el.getZIndex() || 0;
              });

              /**
               * Find the index of the layer to be pushed to the group based on the index
               * In this way, the layers ordered by their zIndex to have a better view in layer manager
               */
              const place = ids.findIndex((el) => el > zIndex);
              if (place < 0) {
                layersInGroup.push(tileLayer);
              } else {
                layersInGroup.insertAt(place, tileLayer);
              }
              if (layersInGroup instanceof Collection) {
                layerGr.setLayers(layersInGroup);
              }
            }
          }
        });

      return () => {
        if (mapObject) {
          mapObject.removeLayer(tileLayer);
        }
      };
    }
  }, [mapObject]);

  return null;
};

export default TileLayer;
