import { Draw } from "ol/interaction";
import { Vector as VectorSource } from "ol/source";

/**
 * Instance of Draw interaction
 * @param {string} type Type of drawing interaction
 */

export type TDraw = "Polygon" | "Point";

export const createInteractionDraw = (type: TDraw): Draw => {
  return new Draw({
    type: type,
    source: new VectorSource({
      wrapX: false,
    }),
  });
};
