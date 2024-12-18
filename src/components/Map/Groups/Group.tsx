import React from "react";

/* Stores */
import useMapStore from "@/store/mapStore";

/* Import Utility Functions */
import { CreateLayerGroup } from "@/components/Map/utilities/Layer";

/**
 * Component Interface.
 */
interface IGroups {
  /** Group unique name */
  name: string;
  /** Group title */
  title: string;
  /** ZIndex to order group on map */
  zIndex?: number;
  /** React Nodes children */
  children: React.ReactNode;
}

/**
 * Component Body.
 */
const Group: React.FC<IGroups> = (props) => {
  console.log("Running Group...");
  const { name, title, zIndex, children } = props;

  /**
   * Use map context
   */
  const { mapObject } = useMapStore();

  /**
   * Create ol.layer.Group if not exist
   */
  if (!mapObject.getLayers().getArray().length) {
    const layerGroup = CreateLayerGroup({ name, title });
    mapObject.addLayer(layerGroup);
    if (typeof zIndex !== "undefined") layerGroup.setZIndex(zIndex);
  } else {
    const existedLayerIDs = mapObject
      .getLayers()
      .getArray()
      .map((layerCollection) => {
        return layerCollection.get("name") as string;
      });
    if (existedLayerIDs.indexOf(name) < 0) {
      const layerGroup = CreateLayerGroup({ name, title });
      mapObject.addLayer(layerGroup);
      if (typeof zIndex !== "undefined") layerGroup.setZIndex(zIndex);
    }
  }

  return <div>{children}</div>;
};

export default Group;
