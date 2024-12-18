import "./LayerList.css";

import React from "react";

import { Collection } from "ol";
import { Group } from "ol/layer";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";

import LayerListBaseMap from "./LayerListBaseMap";
import LayerListOverlay from "./LayerListOverlay";

// import {
//   LAYER_GROUP_BASE_MAP,
//   LAYER_GROUP_RESULTS,
//   LAYER_GROUP_UTILS,
// } from "../../../constants/map-constants";

/**
 * List component for each section in layer list.
 */
const LayerListSection: React.FC<{
  /** Explain me! */
  groupID: string;
  /** Explain me! */
  groupTitle: string;
  /** Explain me! */
  layers: Group;
  /** Explain me! */
  externalLinkClickEventHandler?: (layerID: string) => void;
}> = ({ groupID, groupTitle, layers, externalLinkClickEventHandler }) => {
  switch (groupID) {
    case "base-map":
      return (
        <LayerListBaseMap key={groupID} title={groupTitle} olGroup={layers} />
      );

    case "download":
    case "user-data":
      return (
        <LayerListOverlay
          key={groupID}
          title={groupTitle}
          olGroup={layers}
          selectionType="checkbox"
          externalLinkClickEventHandler={(layerID) =>
            externalLinkClickEventHandler
              ? externalLinkClickEventHandler(layerID)
              : {}
          }
        />
      );
    default:
      return <React.Fragment key="123"></React.Fragment>;
  }
};

/**
 * Main Component Body.
 */
const LayerList: React.FC<{
  /** Toggle layer list on/off */
  show?: boolean;
  /** Group of layers to be categorized in list */
  olLayerCollection?: Collection<Group>;
  /** Handling click on external link */
  onShowExternalLinkPopup?: (sourceLink: string) => void;
}> = (props) => {
  const { show, olLayerCollection, onShowExternalLinkPopup } = props;

  const _show = typeof show === "undefined" ? false : show;

  /**
   * Is not added to DOM when ol.Group doesn't contain layer
   */
  if (!_show) return <></>;

  /**
   * Show embedded error message in component
   */
  if (olLayerCollection?.getArray().length === 0) {
    return (
      <div className="container">
        <div style={{ padding: 4 }}>
          <span style={{ color: "#444", fontSize: 11 }}>Loading map ...</span>
        </div>
      </div>
    );
  } else {
    // console.log("Groups");
    // olLayerCollection?.getArray().map((layerGr, idx) => {
    //   console.log(layerGr.get("id"));
    //   console.log(layerGr);
    // });
  }

  /**
   * Return external link for selected layer
   */
  const createExternalLink = (groupID: string, layerID: string) => {
    let sourceLink = "";
    olLayerCollection?.forEach((layerGroup) => {
      if (layerGroup.get("id") === groupID) {
        layerGroup.getLayersArray().map((lyr) => {
          if (lyr instanceof TileLayer || lyr instanceof VectorLayer) {
            if (lyr.get("id") === layerID) {
              const layerSource = lyr.getSource();
              const layerSourceURL = layerSource?.getUrls()[0];
              if (lyr instanceof TileLayer) {
                sourceLink = layerSourceURL.split("?extent")[0];
                const parts = sourceLink.split("{z}/{x}/{y}");
                sourceLink = parts[0] + "wmts/capabilities.xml" + parts[1];
                return true;
              }
              // sourceLink = `${
              //   endpoints().data
              // }/geo/${getUserId()}/${wsID}/reference_data`;
            }
          }
        });
      }
    });
    return sourceLink;
  };

  /**
   * Manages displaying popup window containing external link
   */
  const showExternalLinkPopup = (
    // e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    groupID: string,
    layerID: string
  ) => {
    // e.preventDefault();
    const sourceLink = createExternalLink(groupID, layerID);
    if (onShowExternalLinkPopup) onShowExternalLinkPopup(sourceLink);
  };

  return (
    <div className="layer-list-container">
      {olLayerCollection?.getArray().map((layerGr, idx) => (
        <LayerListSection
          key={idx}
          groupID={layerGr.get("id")}
          groupTitle={layerGr.get("label")}
          layers={layerGr}
          externalLinkClickEventHandler={(layerID) =>
            showExternalLinkPopup(layerGr.get("id"), layerID)
          }
        />
      ))}
    </div>
  );
};

export default LayerList;
