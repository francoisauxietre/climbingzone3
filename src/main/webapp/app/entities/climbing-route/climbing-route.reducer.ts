import axios from 'axios';
import {
  parseHeaderForLinks,
  loadMoreDataWhenScrolled,
  ICrudGetAction,
  ICrudGetAllAction,
  ICrudPutAction,
  ICrudDeleteAction
} from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IClimbingRoute, defaultValue } from 'app/shared/model/climbing-route.model';

export const ACTION_TYPES = {
  FETCH_CLIMBINGROUTE_LIST: 'climbingRoute/FETCH_CLIMBINGROUTE_LIST',
  FETCH_CLIMBINGROUTE: 'climbingRoute/FETCH_CLIMBINGROUTE',
  CREATE_CLIMBINGROUTE: 'climbingRoute/CREATE_CLIMBINGROUTE',
  UPDATE_CLIMBINGROUTE: 'climbingRoute/UPDATE_CLIMBINGROUTE',
  DELETE_CLIMBINGROUTE: 'climbingRoute/DELETE_CLIMBINGROUTE',
  RESET: 'climbingRoute/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IClimbingRoute>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ClimbingRouteState = Readonly<typeof initialState>;

// Reducer

export default (state: ClimbingRouteState = initialState, action): ClimbingRouteState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CLIMBINGROUTE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CLIMBINGROUTE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CLIMBINGROUTE):
    case REQUEST(ACTION_TYPES.UPDATE_CLIMBINGROUTE):
    case REQUEST(ACTION_TYPES.DELETE_CLIMBINGROUTE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CLIMBINGROUTE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CLIMBINGROUTE):
    case FAILURE(ACTION_TYPES.CREATE_CLIMBINGROUTE):
    case FAILURE(ACTION_TYPES.UPDATE_CLIMBINGROUTE):
    case FAILURE(ACTION_TYPES.DELETE_CLIMBINGROUTE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CLIMBINGROUTE_LIST): {
      const links = parseHeaderForLinks(action.payload.headers.link);

      return {
        ...state,
        loading: false,
        links,
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links),
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    }
    case SUCCESS(ACTION_TYPES.FETCH_CLIMBINGROUTE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CLIMBINGROUTE):
    case SUCCESS(ACTION_TYPES.UPDATE_CLIMBINGROUTE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CLIMBINGROUTE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/climbing-routes';

// Actions

export const getEntities: ICrudGetAllAction<IClimbingRoute> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_CLIMBINGROUTE_LIST,
    payload: axios.get<IClimbingRoute>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IClimbingRoute> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CLIMBINGROUTE,
    payload: axios.get<IClimbingRoute>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IClimbingRoute> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CLIMBINGROUTE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<IClimbingRoute> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CLIMBINGROUTE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IClimbingRoute> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CLIMBINGROUTE,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
