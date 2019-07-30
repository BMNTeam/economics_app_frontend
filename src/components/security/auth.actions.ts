import axios, {AxiosBasicCredentials} from "axios";

import {Dispatch} from "react";
import {ActionPayload} from "../../shared";

export const CHECK_IF_TOKEN_EXIST = "CHECK_IF_TOKEN_EXIST";
export const LOG_OUT = "LOG_OUT";
export const LOG_IN = "LOG_IN";

const localStorageUrl = "token";


export const checkIfTokenExist = () => {
  return async(dispatch: Dispatch<ActionPayload<boolean>>) => {
    const item = localStorage.getItem(localStorageUrl);
    dispatch({
      type: CHECK_IF_TOKEN_EXIST,
      payload: !!item
    });
  }
};

export const logOut = () => {
  return async(dispatch: Dispatch<ActionPayload<undefined>>) => {
    localStorage.removeItem(localStorageUrl);
    dispatch({
      type: LOG_OUT
    });
  }
};

export const logIn = (credentials: AxiosBasicCredentials) => {
  return async(dispatch: Dispatch<ActionPayload<string>>) => {
    const resp = await axios.post<string | null>("http://economicsapp:8888/api/login_check", credentials);

    if(resp.status === 200)
    {
      dispatch({
        type: LOG_IN,
        payload: resp.data || undefined
      });
      return;
    }
  }
};


