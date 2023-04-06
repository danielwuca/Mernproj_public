import React, { useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { getAllUserLists, saveNewList } from "../api";
import { actionType } from "../context/reducer";
import AlertSuccess from "./AlertSuccess";
import AlertError from "./AlertError";

const DashboardNewList = () => {
  const [setAlert, setSetAlert] = useState(null);
  const [alertMsg, setAlertMsg] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [{ user }, dispatch] = useStateValue();
  const creater = user.user.name;

  const [listName, setListName] = useState("");
  const [description, setDescription] = useState("");
  const [list_track, setList_track] = useState("");
  const [isPublic, setisPublic] = useState("private");

  const calculateTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const returnMin = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(sec % 60);
    const returnSec = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnMin} : ${returnSec}`;
  };

  const saveList = () => {
    if (!list_track || !isPublic || !listName) {
      setSetAlert("error");
      setAlertMsg("Required fields are missing");
      setTimeout(() => {
        setSetAlert(null);
      }, 4000);
    } else {
      const data = {
        list_name: listName,
        creater_name: creater,
        description: description,
        list_track: list_track,
        number_of_rates: 0,
        average_rate: 0,
        number_of_tracks: list_track.length,
        public: isPublic,
        total_playtime: "00:00",
      };

      saveNewList(data).then((res) => {
        getAllUserLists().then((data) => {
          dispatch({
            type: actionType.SET_ALL_USERLISTS,
            allUserList: data.data,
          });
        });
      });
      setSetAlert("success");
      setAlertMsg("Data saved successfully");
      setTimeout(() => {
        setSetAlert(null);
      }, 4000);
      setListName("");
    }
  };

  return (
    <div className="flex items-center justify-center p-4 border border-gray-300 rounded-md">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
        <div className="flex flex-col items-center justify-center gap-4">
          <input
            type="text"
            placeholder="Type your list name (required)"
            className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-gray-300 bg-transparent"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Type your description (optional)"
            className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-gray-300 bg-transparent"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Type your list of track ids (required)"
            className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-gray-300 bg-transparent"
            value={list_track}
            onChange={(e) => setList_track(e.target.value)}
          />
          <input
            type="text"
            placeholder="public or private (required)"
            className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-gray-300 bg-transparent"
            value={isPublic}
            onChange={(e) => setisPublic(e.target.value)}
          />

          <div className="flex items-center justify-between gap-2 w-full flex-wrap">
            <div className="flex items-center justify-end w-full p-4">
              <motion.button
                whileTap={{ scale: 0.75 }}
                className="px-8 py-2 rounded-md text-white bg-red-600 hover:shadow-lg"
                onClick={saveList}
              >
                Create
              </motion.button>
            </div>
          </div>
        </div>
      </div>
      {setAlert && (
        <>
          {setAlert === "success" ? (
            <AlertSuccess msg={alertMsg} />
          ) : (
            <AlertError msg={alertMsg} />
          )}
        </>
      )}
    </div>
  );
};

export default DashboardNewList;
