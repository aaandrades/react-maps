import { createContext, useContext } from "react";
import { IContext } from "./types";

export const MapsContext = createContext<IContext>({
  maps: {
    points: [],
    defaultPoints: [],
    showDetails: true,
    currentAction: "",
  },
  loading: false, 
  setLoading: () => {},
  setMaps: () => {},
});

export const useMapContext = () => useContext(MapsContext);
