import React, {PropsWithChildren, useState} from "react";
import {defineClassName} from "../../../shared";

export interface MenuElement {
  label: string;
  action?: () => void
}
const DropdownMenuItem: React.FC<PropsWithChildren<{icon: string, label?: string, items?: MenuElement[]}>> = (props) => {
  const [opened, setOpened] = useState(false);
  const toggleOpened = () => {
    setOpened(!opened);
  };

  return(
     <li className="nav-item dropdown">
       <a href="#" onClick={toggleOpened} className="nav-link" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false">
         <i className="material-icons">{props.icon}</i>
         <p className="d-lg-none d-md-block">
           Account
         </p>
       </a>
       <div  className={defineClassName("dropdown-menu dropdown-menu-right", "show", () => opened)} aria-labelledby="navbarDropdownProfile">
         {props.items && props.items.map((e, i) =>
           <a key={i} className="dropdown-item" onClick={() => e.action &&e.action()}>{e.label}
           </a>)}
         {/*<div className="dropdown-divider"></div>*/}
         {/*<a className="dropdown-item" href="/">Log out</a>*/}
       </div>
     </li>
  )
};

export default DropdownMenuItem;