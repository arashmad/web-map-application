// Containing server actions for the search address
"use server";

/* API */
import { searchAPI } from "./api";

/* Types */
import {
  AddressPointFeatureCollection,
  AddressPointFeatureCollectionSchema,
} from "@/types/Geojson/Geojson";

export async function searchAddressAction(
  address: string
): Promise<AddressPointFeatureCollection> {
  try {
    const response = await fetch(`${searchAPI.base}?q=${address}`);
    if (response.status !== 200) {
      return {
        type: "FeatureCollection",
        features: [],
      };
    }

    const data = await response.json();

    // Response validation using zod
    const addresses = AddressPointFeatureCollectionSchema.parse(data);

    return addresses;
  } catch (error) {
    console.error(error);
    return {
      type: "FeatureCollection",
      features: [],
    };
  }
}
