import React, {ChangeEvent} from "react";
interface SelectComponentProps {
  action: (event: ChangeEvent<HTMLSelectElement>) => void
  label: string
  value?: string | number
  options: {
    id: number;
    name: string;
    unit?: string;
  }[]
}
export const SelectComponent:React.FC<SelectComponentProps> = (props) => {
 const {options, action, label} = props;
  return (
    <div className="form-group bmd-form-group">
      <label>{label}</label> <br/>
      <select className="form-control" value={props.value} onChange={action}>
        <option value={undefined}>Не задан</option>
        {options  && options.map((e, i) =>
          <option value={e.id} key={i}> {e.name} </option>)}
      </select>
    </div>
  )
};

export default SelectComponent;