import React, {PropsWithChildren, ReactElement, useState} from "react";

export interface FormValidatorProps {
  setErrors: (s: string) => void;
  setDirty: (v: boolean) => void;
  isValid: () => boolean;
  isDirty: () => boolean;
}

export const FormValidator: React.FC<PropsWithChildren<{onSubmit:(e: React.MouseEvent<HTMLButtonElement>) => void}>> = (props) => {
  const [errors, setErrors] = useState("");
  const [dirty, setDirty] = useState(false);

  function isValid()
  {
    return !errors.length;
  }

  function isDirty()
  {
    return dirty
  }

  return(
    <form>
      {React.Children.map(props.children,
        child => React.cloneElement(child as ReactElement, {props, setErrors, setDirty}))
      }
      <button disabled={!isValid() || !isDirty()} onClick={props.onSubmit} type="submit" className="btn btn-primary pull-right">Авторизоваться
        <div className="ripple-container"/>
      </button>
    </form>
  )
};


