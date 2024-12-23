import { z } from "zod";

const AddressPointPropertiesSchema = z.object({
  place_id: z.number(),
  osm_type: z.string(),
  osm_id: z.number(),
  place_rank: z.number(),
  category: z.string(),
  type: z.string(),
  importance: z.number(),
  addresstype: z.string(),
  name: z.string(),
  display_name: z.string(),
});

export { AddressPointPropertiesSchema };
