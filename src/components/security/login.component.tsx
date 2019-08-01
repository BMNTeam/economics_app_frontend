import React, {MouseEvent, useState} from "react";
import "./login.component.scss";
import {FormValidator} from "../shared/validator/form-validator.component";
import InputValidator from "../shared/validator/input-validator.component";
import {ValidatorComponent} from "../shared/validator/validator.component";

const Login:React.FC = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function submit (e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
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
                                  state={userName}
                                  setState={setUserName}
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

export default Login;