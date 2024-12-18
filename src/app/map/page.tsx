"use client";

/* Custom Components */
import { Map, Toolbox } from "@/components/Map";

/* Stores */
import useMapStore from "@/store/mapStore";

export default function MapPage() {
  console.log("Map Page was rendered.");
  /* call map store*/
  const {
    mapInitiateZoom,
    mapInitiateCenter,
    mapInitiateLayerGroups,
    mapZoomIn,
    mapZoomOut,
  } = useMapStore();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-between px-2 py-1 bg-slate-100">
        {/* Logo Is Here */}
        <div className="text-sm">Log</div>
        {/* Notification/Profile/Setting/Logout*/}
        <div className="text-sm">Settings</div>
      </header>
      {/* Here is the map */}
      <main className="flex-1 overflow-hidden">
        <Map
          zoom={mapInitiateZoom}
          center={mapInitiateCenter}
          dataLayer={mapInitiateLayerGroups}
          options={{ zoomControl: false, scaleBar: false, attribute: false }}
        >
          {/* <Toolbox zoomIn={mapZoomIn} zoomOut={mapZoomOut} /> */}
        </Map>
      </main>
      <footer className="flex justify-between px-2 py-1 bg-slate-100">
        {/* Impressum Is Here */}
        <div className="text-sm">Impressum</div>
        {/* Copyright Is Here */}
        <div className="text-sm">Copyright</div>
      </footer>
    </div>
  );
}
