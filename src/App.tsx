import { useState } from "react";
import logo from "./logo.svg";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
  useMapEvent,
} from "react-leaflet";
import "./App.css";

const App = () => {
  const [markers, setMarkers] = useState([
    { lat: 4.563120692231638, lon: -74.11351203918458, name: "Andres A" },
  ]);

  const RenderMarks = () => {
    const map = useMapEvent("click", (event) => {
      console.log("map", map);
      console.log("value", event);
      setMarkers([
        ...markers,
        {
          name: "nuevito",
          lat: event.latlng.lat,
          lon: event.latlng.lng,
        },
      ]);
    });
    return null;
  };

  return (
    <div id="map">
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
          <Marker position={[marker.lat, marker.lon]}>
            <Popup>
              <div>
                <h1>Un header exageradito</h1>
                <p>Vamos a volvernos locos</p>
              </div>
            </Popup>
          </Marker>
        ))}
        <RenderMarks />
      </MapContainer>
    </div>
  );
};

export default App;
