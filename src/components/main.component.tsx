import React from "react";
import {connect} from "react-redux";
import {Route, Switch} from "react-router";
import AddData from "../features/add-data/add-data.component";
import {AnalyzeComponent} from "../features/analyze/analyze.component";
import HomeComponent from "../features/home/home.component";
import {GlobalStore} from "../store";
import Footer from "./footer/footer";
import NavBar from "./nav-bar/nav-bar-component";
import Sidenav from "./sidenav/sidenav-component";
import Background from "./background.jpg";

import "./main.component.scss";
export const MainComponent: React.FC<{showSideNav?: boolean}> = (props) => {
  return (
    <div className={`wrapper ${props.showSideNav ? 'nav-open' : ''}`}>
      <Sidenav/>
      <div className='main-panel'>
        <NavBar/>

        <div className="content">
          <img className="image" src={Background}/>
          <Switch>
            <Route path={"/add-data"} component={AddData} />
            <Route path={"/analyze"} component={AnalyzeComponent} />
            <Route path={"/"} component={HomeComponent} exact={true}/>
          </Switch>
        </div>
        <Footer/>
      </div>

    </div>
  )
};

function mapStateToProps(state: GlobalStore)
{
  return {showSideNav: state.ui.showSideNav}
}

export default connect(mapStateToProps)(MainComponent)
