import {StatisticsResult} from "../../models/statistics-result";
import {ActionPayload} from "../../shared";
import {GET_STATISTICS, GET_STATISTICS_ERROR} from "./home.actions";

export interface HomeState {
  statistics?: StatisticsResult;
}
export const HomeReducer = (state: HomeState = {}, action: ActionPayload<StatisticsResult>) => {
  switch (action.type)
  {
    case GET_STATISTICS : return {...state, statistics: action.payload};
    case GET_STATISTICS_ERROR: return {...state, statistics: null};
    default: return state;
  }
};