import React from "react";

const Footer: React.FC = () => {
  return(
    <footer className="footer">
      <div className="container-fluid">
        <nav className="float-left">
          <ul>
            <li>
              <a href="https://www.sniish.ru">
                СНИИСХ
              </a>
            </li>
            <li>
              <a href="/about">
                О нас
              </a>
            </li>
          </ul>
        </nav>
        <div className="copyright float-right">
          © 2019 с любовью <i className="material-icons">favorite</i> от
          <a href="/" target="_blank">ГИС</a>.
        </div>
      </div>
    </footer>
  )
};

export default Footer;