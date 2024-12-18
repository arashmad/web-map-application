"use client";

import "./LayerList.css";

import { useEffect, useState } from "react";

import { Group } from "ol/layer";

import LayerListItem from "./LayerListItem";

// import {
//   LAYER_GROUP_RESULTS,
//   LAYER_GROUP_UTILS,
// } from "../../../constants/map-constants";

/**
 * LayerListOverlay component props template
 * @param {} showExternalLinkPopup returns layer name for clicked external link button
 */
interface ILayerListOverlay {
  /** Group list header */
  title: string;
  /** Group of layers according to the ol.layer.Group */
  olGroup: Group;
  /** Input type for the item in list according to the `<input type="..."/>` */
  selectionType: "radio" | "checkbox";
  /** External link button event handler. Returns layer id */
  externalLinkClickEventHandler?: (layerID: string) => void;
}

const LayerListOverlay: React.FC<ILayerListOverlay> = (props) => {
  const { title, olGroup, selectionType, externalLinkClickEventHandler } =
    props;

  /**
   * State to manage checked/un-checked item(s) in list
   */
  const [selectedLayers, setSelectedLayers] = useState<string[]>([]);

  /**
   * Create label from name property
   */
  const adjustLabel = (label: string): string => {
    const [prefix, suffix] = label.split("_prefix_");
    if (!suffix) return label;
    return suffix;
  };

  /**
   * Manage toggling layer in one group
   */
  const onToggleLayer = (layerID: string) => {
    olGroup.getLayers().forEach((lyr) => {
      if (lyr.get("id").indexOf(layerID) >= 0) {
        lyr.setVisible(!lyr.getVisible());
      } else {
        if (selectionType === "radio") {
          lyr.setVisible(false);
        }
      }
    });

    /**
     * Update selected item(s) in list
     */
    setSelectedLayers((currentState) =>
      selectionType === "radio"
        ? [layerID]
        : currentState.indexOf(layerID) >= 0
        ? currentState.filter((el) => {
            return el !== layerID;
          })
        : [...currentState, layerID]
    );
  };

  /**
   * Manage clicking on external link button
   */
  const onClickExternalLink = (layerName: string) => {
    if (externalLinkClickEventHandler) externalLinkClickEventHandler(layerName);
  };

  /**
   * UseEffect to set default selected layer in state
   */
  useEffect(() => {
    if (olGroup.getLayersArray().length) {
      setSelectedLayers(
        olGroup.getLayersArray().map((lyr) => {
          return lyr.get("id");
        })
      );
    }
  }, [olGroup.getLayersArray().length]);

  /**
   * Is not added to DOM when ol.Group doesn't contain layer
   */
  if (olGroup?.getLayersArray().length === 0) {
    return <></>;
  }

  return (
    <div className="layer-list-group">
      <p className="title">{title}</p>
      <div className="body">
        {olGroup?.getLayersArray().map((lyr, _index) => (
          <LayerListItem
            key={lyr.get("id")}
            type={selectionType}
            name={lyr.get("id")}
            label={adjustLabel(lyr.get("label"))}
            active={selectedLayers.indexOf(lyr.get("id")) >= 0}
            // valid={lyr.get("valid")}
            externalLink={lyr.get("externalLink")}
            // displayLegend={_displayLegend}
            // legendObject={lyr.get("legend")}
            onToggleLayer={(e) => onToggleLayer(e.target.value)}
            onClickExternalLink={(e, layerName) =>
              onClickExternalLink(layerName)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default LayerListOverlay;
