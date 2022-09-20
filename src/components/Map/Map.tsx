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
import { throwModal } from "../../providers/ModalProvider";
import RoutingMachine from "./Routes";
import { IGeography, IPoint, IStepDirections } from "../../Models/Interfaces";
import useLoader from "../../hooks/useModal";
import PolygonActions from "../PolygonActions/PolygonActions";

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
  const { enableLoading, disableLoading } = useLoader();

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

  const clearActions = () => {
    setDirections({
      firstStep: null,
      secondStep: null,
    });
    setMaps({
      ...maps,
      currentAction: "",
    });
    setDrawPolygon(false);
    setPolygonPoints([]);
  };

  useEffect(() => {
    if (maps.currentAction === "directions") {
      getCoordsMiddleware();
    }

    if (maps.currentAction === "") {
      clearActions();
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
      if (isMarkerInsidePolygon(point.location.coordinates, polygonPoints))
        newPoints.push(point);
    });
    if (!newPoints.length) {
      throwModal(
        "No results :(",
        "We can't find results for your search, please try again"
      );
      setMaps({ ...maps, showDetails: false });
    } else {
      setMaps({
        ...maps,
        points: newPoints,
        showDetails: true,
      });
    }
    setDrawPolygon(false);
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

  const enableDirections = (point: any) => {
    setUserSelection({
      lat: point.latlng.lat,
      long: point.latlng.lng,
    });
    setDirections({
      firstStep: true,
      secondStep: true,
    });
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
              eventHandlers={{
                click: (e) => {
                  if (directions.firstStep) enableDirections(e);
                },
              }}
              position={[
                marker.location.coordinates[1],
                marker.location.coordinates[0],
              ]}
            >
              {!directions.firstStep && (
                <Popup>
                  <h1>{marker.name}</h1>
                  <p>{marker.description}</p>
                </Popup>
              )}
            </Marker>
          ))}
          {drawPolygon && <RenderMarks />}
          <Polygon positions={polygonPoints} />
          {directions.secondStep && (
            <RoutingMachine
              pointA={{
                lat: 43.683412,
                long: -79.541763,
                // lat: userLocation.lat,
                // long: userLocation.long,
              }}
              pointB={{
                lat: userSelection.lat,
                long: userSelection.long,
              }}
            />
          )}
        </MapContainer>
      </div>
      {maps.currentAction === "draw" && (
        <PolygonActions
          drawPolygon={drawPolygon}
          setDrawPolygon={setDrawPolygon}
          deleteLastPoint={deleteLastPoint}
          restartPolygon={restartPolygon}
          evaluatePoints={evaluatePoints}
        />
      )}
    </>
  );
};
