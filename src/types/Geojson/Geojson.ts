import { z } from "zod";

import { GeometryPointSchema } from "./Geometry";
import { AddressPointPropertiesSchema } from "./Properties";

// Feature Schema
const AddressPointFeatureSchema = z.object({
  type: z.literal("Feature"),
  geometry: GeometryPointSchema,
  properties: AddressPointPropertiesSchema,
});

// FeatureCollection Schema
const AddressPointFeatureCollectionSchema = z.object({
  type: z.literal("FeatureCollection"),
  features: z.array(AddressPointFeatureSchema), // Array of features
  licence: z.optional(z.string()),
});

// In case of needing type in application
export type AddressPointFeatureCollection = z.infer<
  typeof AddressPointFeatureCollectionSchema
>;

export { AddressPointFeatureCollectionSchema };
