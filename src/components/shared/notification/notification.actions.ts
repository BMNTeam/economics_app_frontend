import {Dispatch} from "react";
import {ActionPayload} from "../../../shared";

export const ADD_NOTIFICATION = "ADD_NOTIFICATION";
export const addNotification = (message: string) => {
  return (dispatch: Dispatch<ActionPayload<string>>) => {
    return dispatch({
      type: ADD_NOTIFICATION,
      payload: message
    });
  }
};

export const REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION";
export const removeNotification = (index: number) => {
  return (dispatch: Dispatch<ActionPayload<number>>) => {
    return dispatch({
      type: REMOVE_NOTIFICATION,
      payload: index
    })
  }
};