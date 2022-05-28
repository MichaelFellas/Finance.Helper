import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className="containerSide">
        <NavLink className="sideBarBtn bgEven" to="/bills">
          <div className="sidebarLink">
            <div className="blackText">Bill Tracker</div>
          </div>
        </NavLink>
        <NavLink className="sideBarBtn bgOdd" to="/billsBreakdown">
          <div className="sidebarLink">
            <div className="blackText">Bill Breakdown</div>
          </div>
        </NavLink>
        <NavLink className="sideBarBtn  bgEven" to="/goals">
          <div className="sidebarLink">
            <div className="blackText">Goal Visualizer</div>
          </div>
        </NavLink>
        <NavLink className="sideBarBtn bgOdd" to="/budget">
          <div className="sidebarLink">
            <div className="blackText">Budget Helper</div>
          </div>
        </NavLink>
        <NavLink className="sideBarBtn  bgEven" to="/expense">
          <div className="sidebarLink">
            <div className="blackText">Expenses Tracking</div>
          </div>
        </NavLink>
        <NavLink className="sideBarBtn bgOdd" to="/savings">
          <div className="sidebarLink">
            <div className="blackText">Savings Visualizer</div>
          </div>
        </NavLink>

        <NavLink className="sideBarBtn bgEven" to="/home">
          <div className="sidebarLink">
            <div className="blackText">Home</div>
          </div>
        </NavLink>
      </div>
    </>
  );
};

export default Sidebar;
