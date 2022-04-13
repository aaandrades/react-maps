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
}

export interface IButton {
  children: JSX.Element | string;
  disabled?: boolean;
  className?: string;
  onClick(e: any): void;
}
