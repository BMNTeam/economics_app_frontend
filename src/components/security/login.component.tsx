import {AxiosBasicCredentials} from "axios";
import React, {MouseEvent, useState} from "react";
import "./login.component.scss";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {ActionPayload} from "../../shared";
import {GlobalStore} from "../../store";
import {FormValidator} from "../shared/validator/form-validator.component";
import InputValidator from "../shared/validator/input-validator.component";
import {ValidatorComponent} from "../shared/validator/validator.component";
import {logIn} from "./auth.actions";

const Login:React.FC<{loginUser: (data: AxiosBasicCredentials) => void}> = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function submit (e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    props.loginUser({username, password});

  }

  return (
    <div className={'login-wrapper'}>
      <div className="content">
        <div className="card">
          <div className="card-header card-header-primary">
            <h4 className="card-title">Страница авторизации</h4>
            <p className="card-category">Введите данные для авторизации</p>
          </div>
          <div className="card-body">
            <FormValidator onSubmit={(e) => submit(e)}>
              <ValidatorComponent label="Имя пользователя"
                                  state={username}
                                  setState={setUsername}
                                  validators={'required'}>
                <InputValidator  />
              </ValidatorComponent>
              <ValidatorComponent label="Пароль" type="password" state={password} setState={setPassword} validators={'required'}>
                <InputValidator  />
              </ValidatorComponent>


            </FormValidator>
          </div>
        </div>
      </div>
    </div>
  )
};

const mapDispatchToProps = (dispatch: ThunkDispatch<GlobalStore, null, ActionPayload<string>>) =>({
  loginUser: (data: AxiosBasicCredentials) => dispatch(logIn(data))
});

export default connect(null, mapDispatchToProps)(Login);