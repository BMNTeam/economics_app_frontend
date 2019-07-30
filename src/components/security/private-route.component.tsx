import React from "react";
import {connect} from "react-redux";
import {Redirect, Route} from "react-router";
import {GlobalStore} from "../../store";

const PrivateRoute: React.FC<{component: any, isLogged?: boolean, path: string}> = ({ component: Component, ...rest }) =>{
  return (
    <Route {...rest} render={(props) => (
      rest.isLogged
        ? <Component {...props} />
        : <Redirect to='/login'/>
    )}/>
  )
};

function mapStateToProps(state: GlobalStore)
{
  return {isLogged: state.auth.isLogged}
}

export default connect(mapStateToProps)(PrivateRoute)




