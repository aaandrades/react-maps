import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  useMapEvent,
} from "react-leaflet";
import { points } from "../../statics/DefaultPoints";
import { IPoint } from "../../Models/Interfaces";
import "./styles.scss";
import { useMapContext } from "../../Context/context";

export const Map = () => {
  const [markers, setMarkers] = useState<IPoint[]>(points);
  const [polygonPoints, setPolygonPoints] = useState<any>([]);
  const [drawPolygon, setDrawPolygon] = useState<any>(false);

  const { maps, setMaps } = useMapContext();
  const RenderMarks = () => {
    const map = useMapEvent("click", (event) => {
      setPolygonPoints([
        ...polygonPoints,
        [event.latlng.lat, event.latlng.lng],
      ]);
      // setMarkers([
      //   ...markers,
      //   {
      //     name: "new",
      //     area: 123,
      //     valueM2: 32,
      //     location: {
      //       type: "Point",
      //       coordinates: [event.latlng.lng, event.latlng.lat],
      //     },
      //   },
      // ]);
    });
    return null;
  };

  return (
    <div id="map">
      <MapContainer
        center={[40.7326897662857, -73.92562866210939]}
        zoom={11}
        tap={false}
        className="map-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {maps.points.map((marker) => (
          <Marker
            key={marker._id.$oid}
            position={[
              marker.location.coordinates[1],
              marker.location.coordinates[0],
            ]}
          >
            <Popup>
              <div>
                <h1>{marker.name}</h1>
                <p>{marker.description}</p>
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
