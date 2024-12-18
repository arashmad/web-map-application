import "./LayerList.css";

import { useEffect, useState } from "react";

import { Group } from "ol/layer";

import LayerListItem from "./../LayerListItem";

// import {
//   LAYER_GROUP_RESULTS,
//   LAYER_GROUP_UTILS,
// } from "../../../constants/map-constants";

/**
 * LayerListOverlay component props template
 * @param {string} title Title for following group of layers in list
 * @param {Group} olGroup ol.Group containing ol.layer of different types
 * @param {string} selectionType specify the ui input select type
 * @param {boolean} displayLegend shows legend button if set to true otherwise doesn't show
 * @param {boolean} externalLink shows link button if set to true otherwise doesn't show
 * @param {} showExternalLinkPopup returns layer name for clicked external link button
 */
interface ILayerListOverlay {
  title: string;
  olGroup: Group;
  selectionType: "radio" | "checkbox";
  displayLegend?: boolean;
  externalLink?: boolean;
  collapsed?: boolean;
  showExternalLinkPopup?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    layerName: string
  ) => void;
}

const LayerListOverlay: React.FC<ILayerListOverlay> = (props) => {
  const {
    title,
    olGroup,
    selectionType,
    displayLegend,
    externalLink,
    showExternalLinkPopup,
  } = props;

  const _displayLegend =
    typeof displayLegend === "undefined" ? false : displayLegend;
  const _externalLink =
    typeof externalLink === "undefined" ? false : externalLink;

  /**
   * State to manage checked/un-checked item(s) in list
   */
  const [selectedLayers, setSelectedLayers] = useState<string[]>([""]);

  /**
   * Is not added to DOM when ol.Group doesn't contain layer
   */
  if (olGroup?.getLayersArray().length === 0) {
    return <></>;
  }

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
  const onToggleLayer = (layerName: string) => {
    olGroup.getLayers().forEach((lyr) => {
      if (lyr.get("name").indexOf(layerName) >= 0) {
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
        ? [layerName]
        : currentState.indexOf(layerName) >= 0
        ? currentState.filter((el) => {
            return el != layerName;
          })
        : [...currentState, layerName]
    );
  };

  /**
   * Manage clicking on external link button
   */
  const onClickExternalLink = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    layerName: string
  ) => {
    if (showExternalLinkPopup) showExternalLinkPopup(e, layerName);
  };

  // /**
  //  * UseEffect to set default selected layer in state
  //  */
  // useEffect(() => {
  //   if (olGroup.getLayersArray().length) {
  //     const allNames = olGroup.getLayersArray().map((lyr) => {
  //       return lyr.get("name");
  //     });
  //     if (olGroup.get("name") === LAYER_GROUP_RESULTS)
  //       setSelectedLayers([allNames[0]]);
  //     else if (olGroup.get("name") === LAYER_GROUP_UTILS)
  //       setSelectedLayers(allNames);
  //   }
  // }, [olGroup.getLayersArray().length]);

  return (
    <div className="layer-list-group">
      <p className="title">{title}</p>
      <div className="body">
        {olGroup?.getLayersArray().map((lyr, index) => (
          <LayerListItem
            key={lyr.get("name")}
            type={selectionType}
            name={lyr.get("name")}
            label={adjustLabel(lyr.get("name"))}
            active={selectedLayers.indexOf(lyr.get("name")) >= 0}
            // valid={lyr.get("valid")}
            externalLink={_externalLink}
            // displayLegend={_displayLegend}
            // legendObject={lyr.get("legend")}
            onToggleLayer={(e) => onToggleLayer(e.target.value)}
            onClickExternalLink={(e, layerName) =>
              onClickExternalLink(e, layerName)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default LayerListOverlay;
