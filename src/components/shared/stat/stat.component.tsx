import React from "react";
import {defineClassName} from "../../../shared";

export const StatComponent: React.FC<StatComponentProps> = (props) => {
  const {icon, category, value, additional, color} =  props;
  return(
    <div className="card card-stats">
      <div className={defineClassName("card-header card-header-icon", color || "card-header-info", () => !!color)}>
        <div className="card-icon">
          <i className="material-icons "> {icon} </i>
        </div>
        <p className="card-category"> {category} </p>
        <h3 className="card-title"> {value} </h3>
      </div>
      <div className="card-footer">
        {
          !!additional &&
          <div className="stats">
            <i className="material-icons">{additional.icon}</i>
            <span>{additional.text}</span>
          </div>
        }
      </div>
    </div>
  )
};

export interface StatComponentProps {
  icon: string;
  category: string;
  color?: string;
  value: string;
  additional?: {
    icon: string;
    text: string;
  }
}