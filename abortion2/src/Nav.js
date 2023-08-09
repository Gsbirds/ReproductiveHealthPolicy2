import { NavLink } from "react-router-dom";
import "./App.css";


function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Reproductive Health Policy
        </a>
        {/* <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button> */}
        <div className="navbar" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li>
              <NavLink className="nav-link" aria-current="page" to="/">
                Info
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" aria-current="page" to="/contact">
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
