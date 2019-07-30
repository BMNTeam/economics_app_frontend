import React from "react";
import "./login.component.scss";

const Login:React.FC = () => {
  return (
    <div className={'login-wrapper'}>
      <div className="content">
        <div className="card">
          <div className="card-header card-header-primary">
            <h4 className="card-title">Страница авторизации</h4>
            <p className="card-category">Введите данные для авторизации</p>
          </div>
          <div className="card-body">
            <div className="form-group bmd-form-group is-focused">
              <label className="bmd-label-floating">Имя пользователя</label>
              <input name={'username'} type="text" className="form-control"/>
            </div>
            <br/>
            <div className="form-group bmd-form-group is-focused">
              <label className="bmd-label-floating">Пароль</label>
              <input name={'password'} type="text" className="form-control"/>
            </div>

            <button type="submit" className="btn btn-primary pull-right">Авторизоваться
              <div className="ripple-container"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Login;