import React, {ChangeEvent} from "react";
import {BaseItem} from "../../../models/base-item";

export interface RadioButtonProps {
  option: BaseItem & { disabled?: boolean;};
  name: string;
  action: (event: ChangeEvent<HTMLInputElement>) => void;
}

const RadioButtonComponent: React.FC<RadioButtonProps> = (props) => {
  return (
    <div className="form-check">
      <label className="form-check-label">
        <input className="form-check-input"
               disabled={props.option.disabled}
               type="radio" onChange={props.action} name={props.name} value={props.option.id}/>
        {props.option.name}
        <span className="circle">
                  <span className="check"></span>
                </span>
      </label>
    </div>
  )
};

export default RadioButtonComponent;