import axios from "axios";
import {Dispatch} from "react";
import {AddDataOptions} from "../../models/add-data-options";
import {ActionPayload} from "../../shared";

// export interface MunicipalitiesResultAction {
//   id: number;
//   name: string;
// }
// export const RECEIVE_MUNICIPALITIES = "RECEIVE_MUNICIPALITIES";
//
//
// export const RECEIVE_YEARS = "RECEIVE_YEARS";
// export type YearsResultAction = MunicipalitiesResultAction;
//
// export const receiveAllManufactures = () => {
//   return async(dispatch: Dispatch<ActionPayload<MunicipalitiesResultAction[]>>) => {
//     const resp = await axios.get<MunicipalitiesResultAction[]>(process.env.REACT_APP_GET_REGIONS as string);
//     dispatch({
//       type: RECEIVE_MUNICIPALITIES,
//       payload: resp.data
//     });
//   }
// };
//
// export const receiveAllYears = () => {
//   return async(dispatch: Dispatch<ActionPayload<YearsResultAction[]>>) => {
//     const resp = await axios.get<YearsResultAction[]>(process.env.REACT_APP_GET_YEARS as string);
//     dispatch({
//       type: RECEIVE_YEARS,
//       payload: resp.data
//     });
//   }
// };

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

