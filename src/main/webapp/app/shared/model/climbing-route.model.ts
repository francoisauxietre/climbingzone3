import { Moment } from 'moment';
import { IPlace } from 'app/shared/model/place.model';
import { IClimber } from 'app/shared/model/climber.model';
import { RouteType } from 'app/shared/model/enumerations/route-type.model';
import { ZoneType } from 'app/shared/model/enumerations/zone-type.model';

export interface IClimbingRoute {
  id?: number;
  name?: string;
  bonus?: string;
  latitude?: number;
  longitude?: number;
  difficuty?: string;
  star?: number;
  physical?: number;
  technical?: number;
  tactical?: number;
  mental?: number;
  createdAt?: Moment;
  modifiedAt?: Moment;
  deletedAt?: Moment;
  routeType?: RouteType;
  zouneType?: ZoneType;
  places?: IPlace[];
  openers?: IClimber[];
}

export const defaultValue: Readonly<IClimbingRoute> = {};
