import React, {ChangeEvent} from "react";
import {BaseItem} from "../../../models/base-item";

interface CheckboxProps {
  option: BaseItem;
  action: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxComponent: React.FC<CheckboxProps> = (props) => {
  return(
    <div className="form-check">
      <label className="form-check-label">
        <input className="form-check-input" onChange={props.action} type="checkbox" value={props.option.id}/>
        {props.option.name}
        <span className="form-check-sign">
                          <span className="check"></span>
                </span>
      </label>
    </div>
  )
};

export default CheckboxComponent;