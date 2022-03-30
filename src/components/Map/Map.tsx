import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  useMapEvent,
} from "react-leaflet";
import { points } from "../../models";
import { IPoint } from "../../Models/Interfaces";

export const Map = () => {
  const [markers, setMarkers] = useState<IPoint[]>(points);
  const [polygonPoints, setPolygonPoints] = useState<any>([]);
  const [drawPolygon, setDrawPolygon] = useState<any>(false);

  const RenderMarks = () => {
    const map = useMapEvent("click", (event) => {
      setPolygonPoints([
        ...polygonPoints,
        [event.latlng.lat, event.latlng.lng],
      ]);
      setMarkers([
        ...markers,
        {
          name: "new",
          area: 123,
          valueM2: 32,
          location: {
            type: "Point",
            coordinates: [event.latlng.lng, event.latlng.lat],
          },
        },
      ]);
    });
    return null;
  };

  return (
    <div id="map">
      <button onClick={() => setDrawPolygon(!drawPolygon)}>Set Drawing</button>
      <MapContainer
        center={[4.5783381, -74.1357403]}
        zoom={15}
        className="contenido"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker) => (
          <Marker
            position={[
              marker.location.coordinates[1],
              marker.location.coordinates[0],
            ]}
          >
            <Popup>
              <div>
                <h1>Un header exageradito</h1>
                <p>Vamos a volvernos locos</p>
              </div>
            </Popup>
          </Marker>
        ))}
        {drawPolygon && <RenderMarks />}
        {drawPolygon && <Polygon positions={polygonPoints} />}
      </MapContainer>
    </div>
  );
};
