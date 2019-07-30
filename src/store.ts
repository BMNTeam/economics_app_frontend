import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {AuthReducer, AuthState} from "./components/security/auth.reducer";
import {UIReducer} from "./components/sidenav/sidenav.reducer";

export interface GlobalStore {
  ui: UI,
  auth: AuthState
}

const rootReducer = combineReducers({
  ui: UIReducer,
  auth: AuthReducer
} as any);

export interface UI {
  showSideNav?: boolean
}

export const store = createStore(rootReducer, applyMiddleware(thunk));