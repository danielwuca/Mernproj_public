import React, { useEffect, useState } from "react";
import { AiOutlineClear } from "react-icons/ai";
import { motion } from "framer-motion";
import {
  changingUserRole,
  getAllUsers,
  changingUserActivated,
  getAllLocalUsers,
} from "../api";
import { DashboardUserCard } from "./DashboardUserCard";
import { DashboardLocalUserCard } from "./DashboardLocalUserCard";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { all } from "axios";

const DashboardUsers = () => {
  const [{ allUsers, allLocalUsers }, dispatch] = useStateValue();

  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        dispatch({
          type: actionType.SET_ALL_USERS,
          allUsers: data.users,
        });
      });
    }
  }, []);

  useEffect(() => {
    if (!allLocalUsers) {
      getAllLocalUsers().then((data) => {
        dispatch({
          type: actionType.SET_ALL_LOCALUSERS,
          allLocalUsers: data.users,
        });
      });
    }
  }, []);

  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="relative w-full py-12 min-h-[400px] overflow-x-scroll scrollbar-thin scrollbar-track-slate-300 scrollbar-thumb-slate-400 my-4 flex flex-col items-center justify-start p-4 border border-gray-300 rounded-md gap-3">
        <div className="absolute top-4 left-4">
          <p className="text-xl font-bold">
            Google User :{" "}
            <span className="text-xl font-bold text-textColor">
              {allUsers?.length}
            </span>
          </p>
        </div>

        <div className="w-full min-w-[750px] flex items-center justify-between">
          {/* prettier-ignore */}
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Image</p>
          {/* prettier-ignore */}
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Name</p>
          {/* prettier-ignore */}
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Email</p>
          {/* prettier-ignore */}
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Verified</p>
          {/* prettier-ignore */}
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Activated</p>
          {/* prettier-ignore */}
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Role</p>{" "}
        </div>
        {/* {allUsers && !filtereUsers
          ? allUsers?.map((data, i) => (
              <DashboardUserCard data={data} key={data._id} index={i} />
            ))
          : filtereUsers?.map((data, i) => (
              <DashboardUserCard data={data} key={data._id} index={i} />
            ))} */}
        {allUsers &&
          allUsers?.map((data, i) => (
            <DashboardUserCard data={data} index={i} />
          ))}
      </div>
      <div className="relative w-full py-12 min-h-[400px] overflow-x-scroll scrollbar-thin scrollbar-track-slate-300 scrollbar-thumb-slate-400 my-4 flex flex-col items-center justify-start p-4 border border-gray-300 rounded-md gap-3">
        <div className="absolute top-4 left-4">
          <p className="text-xl font-bold">
            Local User :{" "}
            <span className="text-xl font-bold text-textColor">
              {allLocalUsers?.length}
            </span>
          </p>
        </div>

        <div className="w-full min-w-[750px] flex items-center justify-between">
          {/* prettier-ignore */}
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Image</p>
          {/* prettier-ignore */}
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Name</p>
          {/* prettier-ignore */}
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Email</p>
          {/* prettier-ignore */}
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Verified</p>
          {/* prettier-ignore */}
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Activated</p>
          {/* prettier-ignore */}
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Role</p>{" "}
        </div>
        {allLocalUsers &&
          allLocalUsers?.map((data, i) => (
            <DashboardLocalUserCard data={data} index={i} />
          ))}
      </div>
    </div>
  );
};

export default DashboardUsers;
