import {ActionPayload} from "../../shared";
import {CHECK_IF_TOKEN_EXIST, LOG_IN, LOG_OUT} from "./auth.actions";

export interface AuthState {
  isLogged?: boolean;
  token?: string;
}

export function AuthReducer(state: AuthState = {}, action: ActionPayload<boolean >)
{
  switch (action.type)
  {
    case LOG_IN: return {...state, isLogged: true, token: action.payload};
    case LOG_OUT: return {...state, isLogged: false};
    case CHECK_IF_TOKEN_EXIST: return {...state, isLogged: action.payload};
    default: return state;
  }
}