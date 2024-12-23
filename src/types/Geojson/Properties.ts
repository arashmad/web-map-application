import { z } from "zod";

// https://photon.komoot.io/
const AddressPointPropertiesSchema = z.object({
  osm_type: z.string(),
  osm_id: z.number(),
  extent: z.optional(z.tuple([z.number(), z.number(), z.number(), z.number()])),
  country: z.string(),
  osm_key: z.string(),
  countrycode: z.string(),
  osm_value: z.string(),
  name: z.string(),
  type: z.string(),
});

export { AddressPointPropertiesSchema };
