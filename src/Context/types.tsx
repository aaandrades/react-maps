import { IPoint } from "../Models/Interfaces";

export interface IContext {
  maps: IMaps;
  setMaps(e: any): void;
}

export interface IMaps {
  points: IPoint[];
  defaultPoints: IPoint[];
  showDetails: boolean;
}
