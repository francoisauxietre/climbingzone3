import { IClimber } from 'app/shared/model/climber.model';

export interface ICard {
  id?: number;
  title?: string;
  climbers?: IClimber[];
}

export const defaultValue: Readonly<ICard> = {};
