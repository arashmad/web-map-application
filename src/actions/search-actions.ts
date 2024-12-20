// Containing server actions for the search address
"use server";

import { searchAPI } from "./api";

/* Types */
import { GeoJSON } from "ol/format";

export async function searchAddressAction(
  address: string,
  format: string = "geojson"
): Promise<GeoJSON[] | []> {
  try {
    const response = await fetch(
      `${searchAPI.base}${searchAPI.subRoutes.search}?q=${address}&format=${format}`,
      {
        method: "GET",
      }
    );

    const data = response.json();
    if (response.status !== 200) {
      return [];
    }
    return data;
  } catch (error) {
    return [];
  }
}
