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
    drawPolygon,
    pinPoint,
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
      <main className="h-[calc(100vh-56px)] relative overflow-hidden">
        <Map
          zoom={mapInitiateZoom}
          center={mapInitiateCenter}
          dataLayer={mapInitiateLayerGroups}
          options={{ zoomControl: false, scaleBar: false, attribute: false }}
        >
          <div className="absolute top-4 left-4 z-10">
            <Toolbox
              zoomIn={mapZoomIn}
              zoomOut={mapZoomOut}
              drawPolygon={drawPolygon}
              pinPoint={pinPoint}
              searchLocation={(loc) => console.log(loc)}
            />
          </div>
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
