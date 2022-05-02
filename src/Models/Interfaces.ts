export interface ILocation {
  type: string;
  coordinates: Array<number>;
}

interface IID {
  $oid: string;
}
export interface IPoint {
  _id: IID;
  description: string;
  minValue: number;
  maxValue: number;
  location: ILocation;
  name: string;
}

export interface ITextfield {
  label: string;
  clear?: boolean;
  value: string;
  className?: string;
  placeholder: string;
  onChange(e: any): void;
  onClear?(): void;
}

export interface IButton {
  children: JSX.Element | string;
  disabled?: boolean;
  className?: string;
  onClick(e: any): void;
}

export interface ISvgImages {
  width: string;
  height: string;
}

export interface IIcons {
  onClick?(): void;
  className?: string;
}

export interface IPointDetails {
  point: IPoint;
}

export interface IIcon {
  color?: string;
}

export interface IGeography {
  lat: number | null;
  long: number | null;
}

export interface IStepDirections {
  firstStep: boolean | null;
  secondStep: boolean | null;
}
