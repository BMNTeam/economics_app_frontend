import axios from "axios";
import {Dispatch} from "react";
import {AddDataOptions} from "../../models/add-data-options";
import {AddDataUpdateRequest} from "../../models/add-data-update.request";
import {CulturesResp} from "../../models/cultures";
import {ActionPayload} from "../../shared";


export const RECEIVE_DATA_OPTIONS = "RECEIVE_DATA_OPTIONS";
export const receiveAllOptions = () => {
  return async (dispatch: Dispatch<ActionPayload<AddDataOptions>>) => {
    const resp = await axios.get<AddDataOptions>(process.env.REACT_APP_ADD_DATA_OPTIONS as string);
    dispatch({
      type: RECEIVE_DATA_OPTIONS,
      payload: resp.data
    })
  }
};

export interface CulturesParams {
  municipalityId: number;
  yearId: number;
  statType: number;
}
export const RECEIVE_CULTURES_WITH_DATA = "RECEIVE_CULTURES_WITH_DATA";
export const receiveCulturesWithData = (params: CulturesParams) => {
  return async (dispatch: Dispatch<ActionPayload<CulturesResp>>) => {
    const resp = await axios.get<CulturesResp>(process.env.REACT_APP_ADD_CULTURES_WITH_DATA as string, {params});
    if(resp.status === 200)
    {
      dispatch({
        type: RECEIVE_CULTURES_WITH_DATA,
        payload: resp.data
      });
    }
  }
};

export const UPDATE_CULTURES = "UPDATE_CULTURES";
export const updateCultures = (data: AddDataUpdateRequest) => {
  return async (dispatch: Dispatch<ActionPayload<AddDataUpdateRequest>>) => {
    const resp = await axios.put(process.env.REACT_APP_ADD_DATA as string, {data});
    dispatch({
      type: UPDATE_CULTURES,
      payload: resp.data
    });
  }
};

