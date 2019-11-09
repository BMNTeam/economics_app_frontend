import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
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
import "./nav-bar.component.scss"



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

          <Link to="about">
           <span className="navbar-brand unstyled-link" >ГИС Технологии</span>
         </Link>
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
            Антонов С.А.
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