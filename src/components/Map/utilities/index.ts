import { Collection, Map } from "ol";
import {
  Group as ILayerGroup,
  Tile as ITileLayer,
  Vector as IVectorLayer,
} from "ol/layer";
import { XYZ, OSM } from "ol/source";

const addLayer = (
  map: Map,
  layer: ITileLayer<OSM | XYZ> | IVectorLayer,
  groupName: string
) => {
  map.getLayers().forEach((layerGroup) => {
    if (
      layerGroup instanceof ILayerGroup &&
      layerGroup.get("name") === groupName
    ) {
      const layersInGroupAsArray = layerGroup.getLayers().getArray();
      const updatedLayers = [...layersInGroupAsArray, layer];
      const updatedCollection = new Collection(updatedLayers);
      layerGroup.setLayers(updatedCollection);
      map.addLayer(layer);
    }
  });
};

export { addLayer };
