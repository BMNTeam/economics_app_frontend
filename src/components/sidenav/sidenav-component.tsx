import React from "react";
import {Route, Router} from "react-router";
import {Link} from "react-router-dom";

const Sidenav: React.FC  = () => {
  return (
      <div className="sidebar" data-color="purple" data-background-color="white"
           data-image="../assets/img/sidebar-1.jpg">
        <div className="logo">
          <a href={"/"} className="simple-text logo-normal">
            АИС Экономика
          </a>
        </div>
        <div className="sidebar-wrapper">
          <ul className="nav">
            <li className="nav-item active  ">
              <Link to="/" className="nav-link">
                  <i className="material-icons">dashboard</i>
                  <p>Главная</p>
              </Link>

            </li>
            {/*<li className="nav-item ">
              <a className="nav-link" href="./user.html">
                <i className="material-icons">person</i>
                <p>User Profile</p>
              </a>
            </li>
            <li className="nav-item ">
              <a className="nav-link" href="./tables.html">
                <i className="material-icons">content_paste</i>
                <p>Table List</p>
              </a>
            </li>
            <li className="nav-item ">
              <a className="nav-link" href="./typography.html">
                <i className="material-icons">library_books</i>
                <p>Typography</p>
              </a>
            </li>
            <li className="nav-item ">
              <a className="nav-link" href="./icons.html">
                <i className="material-icons">bubble_chart</i>
                <p>Icons</p>
              </a>
            </li>
            <li className="nav-item ">
              <a className="nav-link" href="./map.html">
                <i className="material-icons">location_ons</i>
                <p>Maps</p>
              </a>
            </li>
            <li className="nav-item ">
              <a className="nav-link" href="./notifications.html">
                <i className="material-icons">notifications</i>
                <p>Notifications</p>
              </a>
            </li>
            <li className="nav-item ">
              <a className="nav-link" href="./rtl.html">
                <i className="material-icons">language</i>
                <p>RTL Support</p>
              </a>
            </li>*/}

          </ul>
        </div>
      </div>
  )
};

export default Sidenav;