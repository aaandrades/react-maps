export interface ILocation {
  type: string;
  coordinates: Array<number>;
}

export interface IPoint {
  name: string;
  area: number;
  valueM2: number;
  location: ILocation;
}
