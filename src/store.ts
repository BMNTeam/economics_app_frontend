import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {AuthReducer, AuthState} from "./components/security/auth.reducer";
import NotificationsReducer, {NotificationsState} from "./components/shared/notification/notification.reducer";
import {UIReducer} from "./components/sidenav/sidenav.reducer";
import {AddDataReducer, AddDataState} from "./features/add-data/add-data.reducer";
import {AnalyzeDataReducer, AnalyzeState} from "./features/analyze/analyze.reducer";
import {HomeReducer, HomeState} from "./features/home/home.reducer";

export interface GlobalStore {
  analyze: AnalyzeState,
  ui: UI,
  auth: AuthState,
  addData: AddDataState,
  home: HomeState,
  notifications: NotificationsState
}

const rootReducer = combineReducers({
  analyze: AnalyzeDataReducer,
  ui: UIReducer,
  auth: AuthReducer,
  addData: AddDataReducer,
  home: HomeReducer,
  notifications: NotificationsReducer
} as any);

export interface UI {
  showSideNav?: boolean
}

export const store = createStore(rootReducer,composeWithDevTools( applyMiddleware(thunk)));