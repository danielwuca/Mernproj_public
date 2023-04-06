import React from "react";
import Header from "./Header";
import { NavLink, Route, Routes } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import DashboardHome from "./DashboardHome";
import DashboardUsers from "./DashboardUsers";
import DashboardLists from "./DashboardLists";
import DashboardNewList from "./DashboardNewList";

const Dashboard = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
      <Header />
      <div className="w-[60%] my-2  p-4 flex items-center justify-evenly">
        <NavLink
          to={"/dashboard/home"}
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
        >
          <IoHome className="text-2xl text-textColor" />
        </NavLink>
        <NavLink
          to={"/dashboard/user"}
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
        >
          Users
        </NavLink>
        <NavLink
          to={"/dashboard/list"}
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
        >
          Lists
        </NavLink>
      </div>

      <div className="my-4 w-full p-4">
        <Routes>
          <Route path="/home" element={<DashboardHome />} />
          <Route path="/user" element={<DashboardUsers />} />
          <Route path="/list" element={<DashboardLists />} />
          <Route path="/newList" element={<DashboardNewList />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
