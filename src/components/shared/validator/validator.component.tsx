import React, {ReactElement, useState} from "react";
import {FormValidatorProps} from "./form-validator.component";
import RequiredValidator from "./helpers/required-validator.component";

interface ValidatorOptions {
  label: string;
  type?: string;
  state: string;
  setState: (s: string) => void;
  validators?: string;
}

export type ValidatorProps = ValidatorOptions & Partial<FormValidatorProps>;

export const ValidatorComponent: React.FC<ValidatorProps> = (props) => {
  const [validate, setValidate] = useState(false);
  const [toggled, setToggled] = useState(false);

  const validators = props.validators && props.validators
    .split("|").reduce((acc, c) => (acc[c] = c, acc), {} as Record<string, string>);

  function changed(e: React.ChangeEvent<HTMLInputElement>)
  {
    props.setState(e.target.value);
    setValidate(true);
    setToggled(!!e.target.value.length);
    props && props.setDirty && props.setDirty(true);

  }

  return(
    <div>
      <div className={
        defineClassName("form-group bmd-form-group", "is-focused",
          () => toggled)}>
        <label className="bmd-label-floating">{props.label}</label>
        {React.Children.map(props.children, child => React.cloneElement(child as ReactElement, {...props, changed}))}

        {validate && <RequiredValidator {...props}/>}
      </div>
    </div>
  )
};




const defineClassName = (names: string, add: string, shouldAdd: () => boolean) => {
  return shouldAdd() ? names + " " + add : names;
};