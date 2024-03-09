import React from "react";
import "./index.css";

import { IoCloseCircleOutline } from "react-icons/io5";
import { images } from "../../images";
import { NavLink, Outlet } from "react-router-dom";
import StatsCard from "../../components/statsCard";
import { FaHamburger } from "react-icons/fa";
const Dashboard = () => {
  const [show, setShow] = React.useState(true);
  return (
    <div className="dashboard_container">
      <div className="header">
        <div className="icon" onClick={() => setShow(!show)}>
          <FaHamburger />
        </div>
        <button className="connect_wallet_btn">connect wallet</button>
      </div>
      <div className="dashboard">
        <div className={show ? "side_menu hide" : "side_menu"}>
          <div className="menu_container">
            <div className="brand_log">Logo</div>
            <div className="nav_container">
              <div className="menu_list">
                <NavLink
                  className="menu_item"
                  to={""}
                  end
                  onClick={() => setShow(!show)}
                >
                  <img src={images.dashboard} alt="dashboard" />
                  <span>dashboard</span>
                </NavLink>

                <NavLink
                  className="menu_item"
                  to={"support"}
                  onClick={() => setShow(!show)}
                >
                  <img src={images.support} alt="support" />
                  <span>support</span>
                </NavLink>
              </div>
              <button>connect</button>
            </div>
            <div className="close_btn" onClick={() => setShow(!show)}>
              <IoCloseCircleOutline />
            </div>
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
