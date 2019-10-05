import axios from "axios";
import {Dispatch} from "react";
import {ADD_NOTIFICATION} from "../../components/shared/notification/notification.actions";
import {AddDataOptions} from "../../models/add-data-options";
import {AddDataUpdateRequest} from "../../models/add-data-update.request";
import {MunicipalitiesResp} from "../../models/municipalities";
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
  cultureId: number;
  yearId: number;
  statType: number;
  farmCategory: number;
}
export const RECEIVE_MUNICIPALITIES_WITH_DATA = "RECEIVE_MUNICIPALITIES_WITH_DATA";
export const receiveCulturesWithData = (params: CulturesParams) => {
  return async (dispatch: Dispatch<ActionPayload<MunicipalitiesResp>>) => {
    const resp = await axios.get<MunicipalitiesResp>(process.env.REACT_APP_ADD_MUNICIPALITIES_WITH_DATA as string, {params});
    if(resp.status === 200)
    {
      dispatch({
        type: RECEIVE_MUNICIPALITIES_WITH_DATA,
        payload: resp.data
      });
    }
  }
};

export const UPDATE_CULTURES = "UPDATE_CULTURES";
export const updateCultures = (data: AddDataUpdateRequest) => {
  return async (dispatch: Dispatch<ActionPayload<AddDataUpdateRequest | string>>) => {
    const resp = await axios.put(process.env.REACT_APP_ADD_DATA as string, {data});
    dispatch({
      type: UPDATE_CULTURES,
      payload: resp.data
    });
    dispatch({
      type: ADD_NOTIFICATION,
      payload: "Данные успешно обновленны"
    });
  }
};

