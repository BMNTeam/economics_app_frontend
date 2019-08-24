import React, {useEffect} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {ThunkDispatch} from "redux-thunk";
import {ActionPayload} from "../../shared";
import {GlobalStore} from "../../store";
import {logOut} from "../security/auth.actions";
import DropdownMenuItem, {MenuElement} from "../shared/dropdown/dropdown-menu-item.component";
import {removeNotification} from "../shared/notification/notification.actions";
import {NotificationComponent} from "../shared/notification/notification.component";
import {NotificationsState} from "../shared/notification/notification.reducer";
import {toggleSideNav} from "../sidenav/sidenav.actions";

interface NavBarProps {
  toggleSideNav: () => void;
  logOut: () => void;
  removeNotification: (i: number) => void;
  notifications: NotificationsState
}
const NavBar: React.FC<NavBarProps> = (props) => {
  const userMenuItems: MenuElement[] = [{label: "Выход", action: () => props.logOut()}];

  return(
    <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
      <div className="container-fluid">
        <div className="navbar-wrapper">
          <a className="navbar-brand" href="/">ГИС Технологии</a>
        </div>
        <button  className="navbar-toggler" type="button" onClick={props.toggleSideNav} data-toggle="collapse" aria-controls="navigation-index"
                aria-expanded="false" aria-label="Toggle navigation">
          <span className="sr-only">Toggle navigation</span>
          <span className="navbar-toggler-icon icon-bar"></span>
          <span className="navbar-toggler-icon icon-bar"></span>
          <span className="navbar-toggler-icon icon-bar"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end">
          {/*<form className="navbar-form">
              <span className="bmd-form-group"><div className="input-group no-border">
                <input type="text" className="form-control" placeholder="Search..."/>
                <button type="submit" className="btn btn-white btn-round btn-just-icon">
                  <i className="material-icons">search</i>
                  <div className="ripple-container"></div>
                </button>
              </div></span>
          </form>*/}
          <ul className="navbar-nav">
            {/*<li className="nav-item">
              <a className="nav-link" href="/">
                <i className="material-icons">dashboard</i>
                <p className="d-lg-none d-md-block">
                  Stats
                </p>
              </a>
            </li>*/}
            <li className="nav-item dropdown">
              <a className="nav-link" href="/" id="navbarDropdownMenuLink" data-toggle="dropdown"
                 aria-haspopup="true" aria-expanded="false">
                <i className="material-icons">notifications</i>
                <span className="notification">5</span>
                <p className="d-lg-none d-md-block">
                  Some Actions
                </p>
              </a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                <a className="dropdown-item" href="/">Mike John responded to your email</a>
                <a className="dropdown-item" href="/">You have 5 new tasks</a>
                <a className="dropdown-item" href="/">You're now friend with Andrew</a>
                <a className="dropdown-item" href="/">Another Notification</a>
                <a className="dropdown-item" href="/">Another One</a>
              </div>
            </li>
            <DropdownMenuItem icon="person" items={userMenuItems}/>
            {!!props.notifications.data.length && props.notifications.data
              .map((e,i) => <NotificationComponent
                text={e.text}
                key={i}
                holdCloseClick={() => props.removeNotification(i)}
              />)
            }
          </ul>
        </div>
      </div>
    </nav>
  )
};

const mapStateToProps = (state: GlobalStore) => {
  return {notifications: state.notifications}
};

const mapDispatchToProps = (dispatch: ThunkDispatch<GlobalStore, null, ActionPayload<string | number>>) => ({
  toggleSideNav: () => dispatch(toggleSideNav()),
  logOut: bindActionCreators(logOut, dispatch),
  removeNotification: (i: number) => dispatch(removeNotification(i))
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)