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

export interface ITextfield {
  label: string;
  value: string;
  placeholder: string;
  onChange(e: any): void;
}

export interface IButton {
  children: JSX.Element | string;
  disabled?: boolean;
  className?: string;
  onClick(e: any): void;
}
