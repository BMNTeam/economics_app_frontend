import {ActionPayload} from "../../shared";
import {UI} from "../../store";
import {CHANGE_SIDENAV} from "./sidenav.actions";

export function UIReducer(state: UI = {}, action: ActionPayload<boolean>) {
  switch (action.type)
  {
    case CHANGE_SIDENAV: return {...state, showSideNav: !state.showSideNav };
    default: return state;
  }
}
