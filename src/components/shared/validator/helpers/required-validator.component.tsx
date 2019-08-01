import React from "react";
import {ValidatorProps} from "../validator.component";

const RequiredValidator: React.FC<ValidatorProps> = (props) => {
  const errorSpan = <span className="text-danger small position-absolute">
    Необходимо задать значение {props && props.setErrors && props.setErrors("required")}
  </span>;

  return (
    <div>
      { !props.state.length && errorSpan}
      {!!props.state.length && props && props.setErrors && props.setErrors("")}
    </div>
  )
};

export default RequiredValidator;
