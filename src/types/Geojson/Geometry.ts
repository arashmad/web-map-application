import { z } from "zod";

// Geometry Point Schema
const GeometryPointSchema = z.object({
  type: z.literal("Point"),
  coordinates: z.tuple([z.number(), z.number()]),
});

export { GeometryPointSchema };
