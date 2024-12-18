// A client component
"use client";

import { useState } from "react";

import { Group } from "ol/layer";

import LayerListItem from "./../LayerListItem";

/**
 * BaseMapLayerList component props template
 */
interface ILayerListBaseMap {
  /** Group title in layer list*/
  title: string;
  /** Group (ol.Group) containing layers (ol.layer.*) */
  olGroup: Group;
}

/**
 * Component Body.
 */
const LayerListBaseMap: React.FC<ILayerListBaseMap> = (props) => {
  const { title, olGroup } = props;

  /**
   * Manage toggling layer in one group
   */
  const [activeLayer, setActiveLayer] = useState(
    olGroup?.getLayersArray()[0].get("id")
  );

  /**
   * Is not added to DOM when ol.Group doesn't contain layer
   */
  if (!olGroup?.getLayersArray().length) {
    return <></>;
  }

  /**
   * Manage switching layer in one group
   */
  const onToggleLayer = (layerName: string) => {
    olGroup.getLayers().forEach((lyr) => {
      if (lyr.get("id").indexOf(layerName) >= 0) {
        lyr.setVisible(true);
      } else {
        lyr.setVisible(false);
      }
    });
    setActiveLayer(layerName);
  };

  return (
    <div className="layer-list-group">
      <p className="title">{title}</p>
      <div className="body">
        {olGroup?.getLayersArray().map((lyr, idx) => (
          <LayerListItem
            key={idx}
            type="radio"
            name={lyr.get("id")}
            label={lyr.get("label")}
            active={lyr.get("id") === activeLayer}
            onToggleLayer={(e) => onToggleLayer(e.target.value)}
            externalLink={false}
          />
        ))}
      </div>
    </div>
  );
};

export default LayerListBaseMap;
