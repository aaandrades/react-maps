import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  useMapEvent,
} from "react-leaflet";
import "./styles.scss";
import { useMapContext } from "../../Context/context";
import { isMarkerInsidePolygon } from "../../helpers/helpers";
import DrawIcon from "../../assets/icons/draw";
import EraseIcon from "../../assets/icons/erase";
import SearchIcon from "../../assets/icons/search";
import StopIcon from "../../assets/icons/stop";
import RestartIcon from "../../assets/icons/restart";
import { throwModal } from "../../providers/ModalProvider";
import RoutingMachine from "./Routes";
import { IGeography, IPoint, IStepDirections } from "../../Models/Interfaces";
import useModal from "../../hooks/useModal";

export const Map = () => {
  const [polygonPoints, setPolygonPoints] = useState<any>([]);
  const [drawPolygon, setDrawPolygon] = useState<any>(false);
  const [directions, setDirections] = useState<IStepDirections>({
    firstStep: null,
    secondStep: null,
  });
  const [userLocation, setUserLocation] = useState<IGeography>({
    lat: null,
    long: null,
  });
  const [userSelection, setUserSelection] = useState<IGeography>({
    lat: null,
    long: null,
  });

  const { maps, setMaps } = useMapContext();
  const { enableLoading, disableLoading } = useModal();

  const getCoords = async () => {
    try {
      const loc: any = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (location) => resolve(location),
          (error) => reject(error)
        );
      });
      return {
        lat: loc.coords.latitude,
        lon: loc.coords.longitude,
      };
    } catch (error) {
      throw error;
    }
  };

  const getCoordsMiddleware = async () => {
    enableLoading();
    try {
      const loc = await getCoords();
      disableLoading();
      setUserLocation({
        lat: loc.lat,
        long: loc.lon,
      });
      setDirections({ firstStep: true, secondStep: false });
    } catch (error) {
      disableLoading();
      setMaps({
        ...maps,
        currentAction: "",
      });
      throwModal(
        "Location error",
        "We have encountered an error while getting your location. Please refresh the page and try again!"
      );
    }
  };

  useEffect(() => {
    if (maps.currentAction === "directions") {
      getCoordsMiddleware();
    }
  }, [maps.currentAction]);

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
    let newPoints: IPoint[] = [];
    maps.defaultPoints.forEach((point) => {
      if (isMarkerInsidePolygon(point.location.coordinates, polygonPoints)) {
        newPoints.push(point);
      }
    });
    if (!newPoints.length) {
      throwModal(
        "No results :(",
        "We can't find results for your search, please try again"
      );
      setMaps({
        ...maps,
        showDetails: false,
      });
    } else {
      setMaps({
        ...maps,
        points: newPoints,
        showDetails: true,
      });
    }
  };

  const deleteLastPoint = () => {
    let newPolints = [...polygonPoints];
    newPolints = newPolints.slice(0, -1);
    setPolygonPoints(newPolints);
  };

  const restartPolygon = () => {
    setPolygonPoints([]);
    setMaps({
      ...maps,
      points: [],
      showDetails: false,
    });
  };

  const renderPolygonActions = () => {
    return (
      <section className="map-container__draw">
        <button
          className="map-container__button pointer"
          onClick={() => setDrawPolygon(!drawPolygon)}
        >
          {drawPolygon ? (
            <>
              <StopIcon color="#0082c9" /> Stop
            </>
          ) : (
            <>
              <DrawIcon color="#0082c9" /> Draw
            </>
          )}
        </button>
        <button
          className="map-container__button pointer"
          onClick={() => deleteLastPoint()}
        >
          <EraseIcon color="#0082c9" />
          Delete
        </button>
        <button
          className="map-container__button pointer"
          onClick={() => restartPolygon()}
        >
          <RestartIcon color="#0082c9" />
          Restart
        </button>
        <button
          className="map-container__button pointer"
          onClick={() => evaluatePoints()}
        >
          <SearchIcon color="#0082c9" />
          Search
        </button>
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
                <h1>{marker.name}</h1>
                <p>{marker.description}</p>
              </Popup>
            </Marker>
          ))}
          {drawPolygon && <RenderMarks />}
          <Polygon positions={polygonPoints} />
          {directions.secondStep && (
            <RoutingMachine
              pointA={{
                lat: userLocation.lat,
                long: userLocation.long,
              }}
              pointB={{
                lat: 40.789283,
                long: -73.9487429,
              }}
            />
          )}
        </MapContainer>
      </div>
      {maps.currentAction === "draw" && renderPolygonActions()}
    </>
  );
};
