import axios from "axios";
import {Dispatch} from "react";
import {StatisticsResult} from "../../models/statistics-result";
import {ActionPayload} from "../../shared";

export const GET_STATISTICS = "GET_STATISTICS";
export const getStatistics = () => {
  return async (dispatch: Dispatch<ActionPayload<StatisticsResult>>) => {

    const res = await axios.get<StatisticsResult>(process.env.REACT_APP_GET_STATISTICS as string);
    if (res.data)
    {
      dispatch({
        type: GET_STATISTICS,
        payload: res.data
      })
    }
  }
};