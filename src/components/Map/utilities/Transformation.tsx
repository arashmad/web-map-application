/* Import from ol */
import { fromLonLat } from "ol/proj";

/* Import Interface */
import { IGeoJSONObject } from "../Interfaces";

/**
 * Transform the projection of a coordinate pair
 */
export const transformCoordinate = (
  longitude: number,
  latitude: number
): { x: number; y: number } => {
  const [x, y] = fromLonLat([longitude, latitude]);
  return { x, y };
};

/**
 * Transform the projection of Geojson object.
 */
export const transformGeojsonObject = (
  geojsonObject: IGeoJSONObject
  // targetSRC?: string
) => {
  const results = geojsonObject;
  results["features"].map((feature, index) => {
    let coordinates: number[] | number[][];
    const geometryType = feature.geometry.type.toLowerCase();

    switch (geometryType) {
      case "point":
        coordinates = feature.geometry.coordinates as number[];
        const { x, y } = transformCoordinate(coordinates[0], coordinates[1]);
        results["features"][index]["geometry"]["coordinates"] = [x, y];
        break;

      case "polygon":
        const temp: number[][] = [];
        coordinates = feature.geometry.coordinates[0] as number[][];
        coordinates.map((tuple) => {
          const { x, y } = transformCoordinate(tuple[0], tuple[1]);
          temp.push([x, y]);
        });
        results["features"][index]["geometry"]["coordinates"] = [temp];
        break;
    }
  });
  return results;
};
