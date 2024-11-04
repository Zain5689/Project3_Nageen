import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGroup,
  faUserPlus,
  faPlus,
  faPodcast,
} from "@fortawesome/free-solid-svg-icons";
import "../index.css";

import { NavLink, Outlet } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="side">
        <NavLink
          activeClassName="active"
          to={"users"}
          className="fs-4 navlink mb-2"
        >
          <FontAwesomeIcon icon={faUserGroup} />
          Users
        </NavLink>

        <NavLink to={"user/create"} className="fs-4 navlink mb-3">
          <FontAwesomeIcon icon={faUserPlus} />
          New User
        </NavLink>

        <NavLink to={"products"} className="fs-4 navlink mb-3">
          <FontAwesomeIcon icon={faPodcast} />
          Products
        </NavLink>

        <NavLink to={"product/create"} className="fs-4 navlink mb-3">
          <FontAwesomeIcon icon={faPlus} />
          New Products
        </NavLink>
      </div>

      <div className="right">
        <Outlet />
      </div>
    </div>
  );
}

export default Sidebar;
