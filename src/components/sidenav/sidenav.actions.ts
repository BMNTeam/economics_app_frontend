import {Dispatch} from "react";
import {ActionPayload} from "../../shared";

export const CHANGE_SIDENAV = "CHANGE_SIDENAV";

export const toggleSideNav = () => {
  return async(dispatch: Dispatch<ActionPayload<undefined>>) => {
    dispatch({
      type: CHANGE_SIDENAV
    })
  }
};