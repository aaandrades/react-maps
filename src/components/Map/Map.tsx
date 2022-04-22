import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  useMapEvent,
} from "react-leaflet";
import { points } from "../../Statics/DefaultPoints";
import { IPoint } from "../../Models/Interfaces";
import "./styles.scss";
import { useMapContext } from "../../Context/context";
import { isMarkerInsidePolygon } from "../../helpers/helpers";

export const Map = () => {
  const [markers, setMarkers] = useState<IPoint[]>(points);
  const [polygonPoints, setPolygonPoints] = useState<any>([]);
  const [drawPolygon, setDrawPolygon] = useState<any>(false);

  const { maps, setMaps } = useMapContext();

  const RenderMarks = () => {
    useMapEvent("click", (event) => {
      setPolygonPoints([
        ...polygonPoints,
        [event.latlng.lat, event.latlng.lng],
      ]);
    });
    return null;
  };

  const evaluatePoints = () => {
    let newPoints: Array<any> = [];
    maps.defaultPoints.forEach((point) => {
      if (isMarkerInsidePolygon(point.location.coordinates, polygonPoints)) {
        newPoints.push(point);
      }
    });
    setMaps({
      ...maps,
      points: newPoints,
      showDetails: true,
    });
    console.log(newPoints);
  };

  const renderPolygonActions = () => {
    return (
      <section className="map-container__draw">
        <button onClick={() => setDrawPolygon(!drawPolygon)}>
          {drawPolygon ? "Stop" : "Draw"}
        </button>
        <button onClick={() => evaluatePoints()}>Search</button>
      </section>
    );
  };

  return (
    <>
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
          <Polygon positions={polygonPoints} />
        </MapContainer>
      </div>
      {maps.currentAction === "draw" && renderPolygonActions()}
    </>
  );
};
