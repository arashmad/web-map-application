import React from "react";

// import { Row, Col } from "react-bootstrap";

// import IconButton from "../../main/IconButton";

/**
 * ILayerListItem component props template
 */
interface ILayerListItem {
  /** layer input type either radio button or checkbox */
  type: "radio" | "checkbox";
  /** layer name */
  name: string;
  /** label to show as label on list item */
  label: string;
  /** true if the layer is switched on otherwise is false */
  active: boolean;
  /** true if layer source (hosted file or link) is valid and data is rendered */
  valid?: boolean;
  /** displays layer external link for the 3rd party apps if true otherwise doesn't display */
  externalLink?: boolean;
  /** handle toggling layer on/off in list */
  onToggleLayer: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** handle clicking on external link */
  onClickExternalLink?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    layerName: string
  ) => void;
}

const LayerListItem: React.FC<ILayerListItem> = (props) => {
  const {
    type,
    name,
    label,
    active,
    valid,
    externalLink,
    onToggleLayer,
    onClickExternalLink,
  } = props;

  const _valid = typeof valid === "undefined" ? true : valid;

  return (
    // <Row className="align-items-center">
    //   <Col xs={2}>
    //     <input
    //       type={type}
    //       value={name}
    //       onChange={onToggleLayer}
    //       checked={active}
    //       disabled={!_valid}
    //     />
    //   </Col>
    //   <Col xs={6} className="font-size-xs">
    //     {label}
    //   </Col>
    //   {externalLink ? (
    //     <Col xs={4} className="d-flex justify-content-end">
    //       {/* <IconButton
    //         name="mdi-earth"
    //         size="sm"
    //         color="#444"
    //         background="#f0f0f0"
    //         helper="Show external link"
    //         displayed={_valid && externalLink}
    //         onClick={
    //           onClickExternalLink
    //             ? (e) => onClickExternalLink(e, name)
    //             : () => {}
    //         }
    //       /> */}
    //     </Col>
    //   ) : (
    //     <React.Fragment></React.Fragment>
    //   )}
    // </Row>
    <></>
  );
};

export default LayerListItem;
