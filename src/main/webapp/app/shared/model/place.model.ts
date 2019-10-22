export interface IPlace {
  id?: number;
  name?: string;
  latitude?: number;
  longitude?: number;
  parkingsId?: number;
  locatedId?: number;
}

export const defaultValue: Readonly<IPlace> = {};
