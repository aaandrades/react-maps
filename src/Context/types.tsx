import { IPoint } from "../Models/Interfaces";

export interface IContext {
  maps: IMaps;
  loading: boolean;
  setMaps(e: any): void;
  setLoading(e: any): void;
}

export interface IMaps {
  points: IPoint[];
  defaultPoints: IPoint[];
  showDetails: boolean;
  currentAction: string;
}

export interface IOptions {
  closeSearchBar?(): void;
}
