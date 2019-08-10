import axios, {AxiosBasicCredentials} from "axios";

import {Dispatch} from "react";
import {localStorageUrl, setAuthHeader} from "../../axious.default-headers";
import {ActionPayload} from "../../shared";
import {history} from "../App";

export const CHECK_IF_TOKEN_EXIST = "CHECK_IF_TOKEN_EXIST";
export const LOG_OUT = "LOG_OUT";
export const LOG_IN = "LOG_IN";



export const checkIfTokenExist = () => {
  return (dispatch: Dispatch<ActionPayload<boolean>>) => {
    const item = localStorage.getItem(localStorageUrl);
    dispatch({
      type: CHECK_IF_TOKEN_EXIST,
      payload: !!item
    });
  }
};

export const logOut = () => {
  return async (dispatch: Dispatch<ActionPayload<undefined>>) => {
    localStorage.removeItem(localStorageUrl);
    history.push("/login");
    return dispatch({
      type: LOG_OUT
    });
  }
};

export const logIn = (credentials: AxiosBasicCredentials) => {
  return async(dispatch: Dispatch<ActionPayload<string>>) => {
    const resp = await axios.post<{token: string} | null>(process.env.REACT_APP_API_LOGIN as string, credentials);

    if(resp.status === 200 && resp.data)
    {
      localStorage.setItem(localStorageUrl, resp.data.token);
      dispatch({
        type: LOG_IN,
        payload: resp.data.token
      });
      setAuthHeader(resp.data.token);
      history.push("/");
      return;
    }
  }
};




