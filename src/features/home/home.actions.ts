import axios from "axios";
import {Dispatch} from "react";
import {StatisticsResult} from "../../models/statistics-result";
import {ActionPayload} from "../../shared";

export interface StatisticsRequest {
  cultureId: number;
  yearId: number;
}

export const GET_STATISTICS = "GET_STATISTICS";
export const getStatistics = (params: StatisticsRequest) => {
  return async (dispatch: Dispatch<ActionPayload<StatisticsResult>>) => {

    const res = await axios.get<StatisticsResult>(process.env.REACT_APP_GET_STATISTICS as string, {params});
    if (res.data)
    {
      dispatch({
        type: GET_STATISTICS,
        payload: res.data
      })
    }
  }
};