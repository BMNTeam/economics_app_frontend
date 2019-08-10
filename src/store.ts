import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {AuthReducer, AuthState} from "./components/security/auth.reducer";
import {UIReducer} from "./components/sidenav/sidenav.reducer";
import {AddDataReducer, AddDataState} from "./features/add-data/add-data.reducer";

export interface GlobalStore {
  ui: UI,
  auth: AuthState,
  addData: AddDataState
}

const rootReducer = combineReducers({
  ui: UIReducer,
  auth: AuthReducer,
  addData: AddDataReducer
} as any);

export interface UI {
  showSideNav?: boolean
}

export const store = createStore(rootReducer,composeWithDevTools( applyMiddleware(thunk)));