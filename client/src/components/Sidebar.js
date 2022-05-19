import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className="containerSide">
        <NavLink className="sideBarBtn bgEven" to="/bills">
          <div className="sidebarLink">
            <div className="whiteText">Bill Planner</div>
          </div>
        </NavLink>
        <NavLink className="sideBarBtn  bgOdd" to="/goals">
          <div className="sidebarLink">
            <div className="whiteText">Goal Tracker</div>
          </div>
        </NavLink>
        <NavLink className="sideBarBtn bgEven" to="/budget">
          <div className="sidebarLink">
            <div className="whiteText">Budget Helper</div>
          </div>
        </NavLink>
        <NavLink className="sideBarBtn  bgOdd" to="/expense">
          <div className="sidebarLink">
            <div className="whiteText">Expenses Tracking</div>
          </div>
        </NavLink>
        <NavLink className="sideBarBtn bgEven" to="/savings">
          <div className="sidebarLink">
            <div className="whiteText">Savings Visualizer</div>
          </div>
        </NavLink>
        <NavLink className="sideBarBtn  bgOdd" to="/profile">
          <div className="sidebarLink">
            <div className="whiteText">Update Profile</div>
          </div>
        </NavLink>
        <NavLink className="sideBarBtn bgEven" to="/home">
          <div className="sidebarLink">
            <div className="whiteText">Home</div>
          </div>
        </NavLink>
      </div>
    </>
  );
};

export default Sidebar;
