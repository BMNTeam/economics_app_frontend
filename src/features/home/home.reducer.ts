import {StatisticsResult} from "../../models/statistics-result";
import {ActionPayload} from "../../shared";
import {GET_STATISTICS} from "./home.actions";

export interface HomeState {
  statistics?: StatisticsResult;
}
export const HomeReducer = (state: HomeState = {}, action: ActionPayload<StatisticsResult>) => {
  switch (action.type)
  {
    case GET_STATISTICS : return {...state, statistics: action.payload};
    default: return state;
  }
};