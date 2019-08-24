import {ActionPayload} from "../../../shared";
import {ADD_NOTIFICATION, REMOVE_NOTIFICATION} from "./notification.actions";

export interface NotificationsState {
  data: NotificationData[]
}
export interface NotificationData {
  text: string;
  type?: number
}
export const NotificationsReducer = (state: NotificationsState = {data: []}, action: ActionPayload<string | number>) => {
  switch (action.type)
  {
    case ADD_NOTIFICATION:
      return {...state, data: [...state.data, {text: action.payload as string || ""}]};
    case REMOVE_NOTIFICATION:
      return {...state, data: state.data.filter((e, i) => i !== action.payload)};
    default: return state;
  }
};

export default NotificationsReducer;