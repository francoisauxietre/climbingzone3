import { IPlace } from 'app/shared/model/place.model';

export interface IParking {
  id?: number;
  name?: string;
  description?: string;
  places?: IPlace[];
}

export const defaultValue: Readonly<IParking> = {};
