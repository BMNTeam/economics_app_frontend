import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {UIReducer} from "./components/sidenav/sidenav.reducer";

export interface GlobalStore {
  ui: UI
}

const rootReducer = combineReducers({
  ui: UIReducer
});

export interface UI {
  showSideNav?: boolean
}

export const store = createStore(rootReducer, applyMiddleware(thunk));