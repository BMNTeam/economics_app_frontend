import React, {ChangeEvent} from "react";
import "./notification.component.scss";
import {NotificationData} from "./notification.reducer";

interface NotificationProps extends NotificationData{
  holdCloseClick: () => void | undefined;
}

export const NotificationComponent: React.FC<NotificationProps> = (props) =>
{
  function holdCloseClick(e: React.MouseEvent)
  {
    props.holdCloseClick();
  }
  return (
    <div data-notify="container"
         className=" alert alert-warning alert-with-icon animated fadeInDown notification-wrapper" role="alert"
         data-notify-position="top-right">
      <button type="button" aria-hidden="true" onClick={holdCloseClick} className="close" data-notify="dismiss"><i
        className="material-icons">close</i></button>
      <i data-notify="icon" className="material-icons">add_alert</i>
      <span data-notify="title"></span> <span
      data-notify="message">{props.text}</span></div>
  )
};