import { createContext, useContext } from "react";
import { IContext } from "./types";

export const MapsContext = createContext<IContext>({
  maps: {
    points: [],
  },
  setMaps: () => {},
});

export const useMapContext = () => useContext(MapsContext);
