import axios from "axios";
import {Dispatch} from "react";
import {AnalyzeResult} from "../../models/analyze-result";
import {ActionPayload} from "../../shared";
import {AnalyzeFormData} from "./form/analyze-form.component";

export const RECEIVE_ECONOMIC_GRAPH_DATA = "RECEIVE_ECONOMIC_GRAPH_DATA";
export const receiveEconomicGraphData = (params: AnalyzeFormData) => {
  return async (dispatch: Dispatch<ActionPayload<AnalyzeResult>>) => {
    const resp = await axios.get<AnalyzeResult>(process.env.REACT_APP_GET_GRAPH_DATA as string, {params});
    if(resp.status === 200)
    {
      dispatch({
        type: RECEIVE_ECONOMIC_GRAPH_DATA,
        payload: resp.data
      });
    }
  };
};
