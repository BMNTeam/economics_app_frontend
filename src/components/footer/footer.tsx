import React from "react";
import {Link} from "react-router-dom";

const Footer: React.FC = () => {
  return(
    <footer className="footer">
      <div className="container-fluid">
        <nav className="float-left">
          <ul>
            <li>
              <a href="https://fnac.center">
                Северо-Кавказский ФНАЦ
              </a>
            </li>
            <li>
              <Link to="about">
                <a >О нас</a>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="copyright float-right">
          © 2019 с любовью <i className="material-icons">favorite</i> от
          <a target="_blank"> ГИС</a>.
        </div>
      </div>
    </footer>
  )
};

export default Footer;