import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  changingLocalUserRole,
  getAllLocalUsers,
  changingLocalUserActivated,
} from "../api";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";

export const DashboardLocalUserCard = ({ data, index }) => {
  const avatorUrl = data?.imageURL ? data?.imageURL : "/logo192.png";
  const [{ localUser, allLocalUsers }, dispatch] = useStateValue();
  const [isUserRoleUpdated, setisUserRoleUpdated] = useState(false);
  const [isUserActivatedUpdated, setisUserActivatedUpdated] = useState(false);
  const updateUserActivated = (userId, activated) => {
    setisUserActivatedUpdated(false);
    changingLocalUserActivated(userId, activated).then((res) => {
      if (res) {
        getAllLocalUsers().then((data) => {
          dispatch({
            type: actionType.SET_ALL_LOCALUSERS,
            allLocalUsers: data.users,
          });
        });
      }
    });
  };
  const updateUserRole = (userId, role) => {
    setisUserRoleUpdated(false);
    changingLocalUserRole(userId, role).then((res) => {
      if (res) {
        getAllLocalUsers().then((data) => {
          dispatch({
            type: actionType.SET_ALL_LOCALUSERS,
            allLocalUsers: data.users,
          });
        });
      }
    });
  };
  return (
    <motion.div
      key={index}
      className="relative w-full rounded-md flex items-center justify-between py-4 bg-lightOverlay cursor-pointer hover:shadow-md"
    >
      {/* user image */}
      <div className="w-275 min-w-[160px] flex items-center justify-center">
        <img
          src={avatorUrl}
          referrerPolicy="no-referrer"
          alt=""
          className="w-10 h-10 object-cover rounded-md shadow-md min-w-[40px]"
        />
      </div>

      {/* user name */}
      <p className="text-base text-textColor w-275 min-w-[160px] text-center">
        {data.name}
      </p>

      {/* user email */}
      <p className="text-base text-textColor w-275 min-w-[160px] text-center">
        {data.email}
      </p>

      {/* user verified */}
      <p className="text-base text-textColor w-275 min-w-[160px] text-center">
        {data.verified ? "Yes" : "No"}
      </p>

      {/* user Activated */}
      <div className=" w-275 min-w-[160px] text-center flex items-center justify-center gap-6 relative">
        <p className="text-base text-textColor">
          {data.activated === true ? "true" : "false"}
        </p>

        {data._id !== localUser?.localUser._id && (
          <motion.p
            whileTap={{ scale: 0.75 }}
            className="text-[10px]  font-semibold text-textColor px-1 bg-purple-200 rounded-sm hover:shadow-md"
            onClick={() => setisUserActivatedUpdated(true)}
          >
            {data.activated === true ? "deactivate" : "activate"}
          </motion.p>
        )}
        {isUserActivatedUpdated && (
          <motion.div
            className="absolute z-10 top-6 right-4 p-4 flex items-center flex-col gap-4 bg-white shadow-xl rounded-md"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <p className="text-textColor font-semibold text-sm">
              Are you sure you want to {""}
              <span>
                {data.activated === true ? "deactivate" : "activate"}
              </span>{" "}
              the user?
            </p>
            <div className="flex items-center gap-4">
              <motion.button
                whileTap={{ scale: 0.75 }}
                className="outline-none border-none text-sm px-4 py-1 rounded-md bg-blue-200 text-black hover:shadow-md"
                onClick={() =>
                  updateUserActivated(
                    data._id,
                    data.activated === true ? false : true,
                    dispatch
                  )
                }
              >
                Yes
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.75 }}
                className="outline-none border-none text-sm px-4 py-1 rounded-md bg-blue-200 text-black hover:shadow-md"
                onClick={() => setisUserActivatedUpdated(false)}
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>

      {/* user Role */}
      <div className=" w-275 min-w-[160px] text-center flex items-center justify-center gap-6 relative">
        <p className="text-base text-textColor"> {data.role}</p>

        {data._id !== localUser?.localUser._id && (
          <motion.p
            whileTap={{ scale: 0.75 }}
            className="text-[10px]  font-semibold text-textColor px-1 bg-purple-200 rounded-sm hover:shadow-md"
            onClick={() => setisUserRoleUpdated(true)}
          >
            {data.role === "admin" ? "member" : "admin"}
          </motion.p>
        )}
        {isUserRoleUpdated && (
          <motion.div
            className="absolute z-10 top-6 right-4 p-4 flex items-center flex-col gap-4 bg-white shadow-xl rounded-md"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <p className="text-textColor font-semibold text-sm">
              Are you sure to mark the user as{" "}
              <span>{data.role === "admin" ? "menber" : "admin"}</span> ?
            </p>
            <div className="flex items-center gap-4">
              <motion.button
                whileTap={{ scale: 0.75 }}
                className="outline-none border-none text-sm px-4 py-1 rounded-md bg-blue-200 text-black hover:shadow-md"
                onClick={() =>
                  updateUserRole(
                    data._id,
                    data.role === "admin" ? "member" : "admin",
                    dispatch
                  )
                }
              >
                Yes
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.75 }}
                className="outline-none border-none text-sm px-4 py-1 rounded-md bg-gray-200 text-black hover:shadow-md"
                onClick={() => setisUserRoleUpdated(false)}
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default DashboardLocalUserCard;
