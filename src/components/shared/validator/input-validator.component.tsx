import React from "react";
import {ValidatorProps} from "./validator.component";

const InputValidator = (props: Partial<ValidatorProps & {changed: (e: React.ChangeEvent<HTMLInputElement>) => void}>) => {

  return(
    <input onChange={props.changed} type={props.type || 'text'} className="form-control"/>
  )
};

export default InputValidator;
