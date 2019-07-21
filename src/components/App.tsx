import React from 'react';
import './App.scss';
import {connect} from "react-redux"
import {GlobalStore} from "../store";
import Footer from "./footer/footer";
import NavBar from "./nav-bar/nav-bar-component";
import Sidenav from "./sidenav/sidenav-component";

// https://demos.creative-tim.com/material-dashboard/examples/dashboard.html
const App: React.FC<{showSideNav?: boolean}> = (props: {showSideNav?: boolean}) => {
  return (
      <div className={`wrapper ${props.showSideNav ? 'nav-open' : ''}`}>
        <Sidenav/>
        <div className='main-panel'>
          <NavBar/>
          <div className="content">
            <div className="card">
              <div className="card-header card-header-primary">
                <h4 className="card-title">Тестовая карточка</h4>
                <p className="card-category">Напишите что-нибудь</p>
              </div>
              <div className="card-body">
              </div>
            </div>
          </div>
          <Footer/>
        </div>


      </div>
  );
};


function mapStateToProps(state: GlobalStore)
{
  return {showSideNav: state.ui.showSideNav}
}

export default connect(mapStateToProps)(App)
