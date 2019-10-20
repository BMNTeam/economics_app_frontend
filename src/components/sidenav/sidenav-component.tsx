import React, {useState} from "react";
import {Link} from "react-router-dom";
import {defineClassName} from "../../shared";


interface SidenavLink {
  name: string;
  icon: string;
  to: string;
}
const links: SidenavLink[] = [
  {name: "Главная", icon: "dashboard", to: "/"},
  {name: "Добавление", icon: "content_paste", to: "add-data"},
  {name: "Анализ", icon: "find_in_page", to: "analyze"},
  {name: "О нас", icon: "info", to: "about"}
];

const Sidenav: React.FC  = () => {
  const [selected, setSelected] = useState(0);

  return (
      <div className="sidebar" data-color="purple" data-background-color="white"
           data-image="../assets/img/sidebar-1.jpg">
        <div className="logo">
          <span className="simple-text logo-normal">
            АГРО-ПРОДУКТИВНОСТЬ
          </span>
        </div>
        <div className="sidebar-wrapper">
          <ul className="nav">
            {links.map((e, i) =>
                <li className={
                  defineClassName("nav-item", "active", () => selected === i)
                } key={i}>
                  <Link to={e.to} onClick={() => setSelected(i)} className="nav-link">
                    <i className="material-icons">{e.icon}</i>
                    <p>{e.name}</p>
                  </Link>
                </li>
            )}
          </ul>
        </div>
      </div>
  )
};

export default Sidenav;