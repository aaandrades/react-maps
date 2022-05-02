import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import FinalIcon from "../../../assets/images/final-point.svg";

const createRoutineMachineLayer = (props: any) => {
  try {
    // @ts-ignore: Unreachable code error
    const instance = L.Routing.control({
      waypoints: [
        L.latLng(props.pointA.lat, props.pointA.long),
        L.latLng(props.pointB.lat, props.pointB.long),
      ],
      show: false,
      addWaypoints: false,
      routeWhileDragging: true,
      draggableWaypoints: true,
      fitSelectedRoutes: true,
      showAlternatives: true,
      summaryTemplate: "<h2>{name}</h2><p>{distance}, {time}</p>",
      containerClassName: "itinerary",
      lineOptions: {
        styles: [{ color: "#006094", weight: 7 }],
      },
      altLineOptions: {
        styles: [{ color: "#46baf8", weight: 7 }],
      },
      createMarker: (i: number, waypoint: any, n: number) => {
        const marker = L.marker(waypoint.latLng, {
          draggable: true,
          icon: L.icon({
            iconUrl: FinalIcon,
            iconSize: [50, 40],
            iconAnchor: [30, 30],
            popupAnchor: [-3, -76],
          }),
        });
        return marker;
      },
    }).on("routingerror", console.log("error"));
    return instance;
  } catch (error) {
    console.log("fallee");
  }
};

// try {
// } catch (error) {}
const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
