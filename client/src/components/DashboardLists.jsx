import React, { useEffect, useState } from "react";
import { actionType } from "../context/reducer";
import { getAllUserLists, deleteListById } from "../api";
import { useStateValue } from "../context/StateProvider";
import { motion } from "framer-motion";
import { MdDelete } from "react-icons/md";
import { playOnYoutube } from "./Tracks";
import { useNavigate } from "react-router-dom";

const DashboardLists = () => {
  const [{ allUserLists }, dispatch] = useStateValue();
  useEffect(() => {
    if (!allUserLists) {
      getAllUserLists().then((res) => {
        dispatch({
          type: actionType.SET_ALL_USERLISTS,
          allUserLists: res.data,
        });
      });
    }
  }, []);
  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="relative w-full py-12 min-h-[400px] overflow-x-scroll scrollbar-thin scrollbar-track-slate-300 scrollbar-thumb-slate-400 my-4 flex flex-col items-center justify-start p-4 border border-gray-300 rounded-md gap-3">
        <DashboardListHeader />
        {allUserLists &&
          allUserLists?.map((data, i) => (
            <DashboardListCard key={data._id} data={data} index={i} />
          ))}
      </div>
    </div>
  );
};

export const DashboardListHeader = () => {
  return (
    <div className="w-full min-w-[750px] flex items-center justify-between">
      {/* prettier-ignore */}
      <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">List Name</p>
      {/* prettier-ignore */}
      <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Creater</p>
      {/* prettier-ignore */}
      <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Number of Tracks</p>
      {/* prettier-ignore */}
      <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Total Play Time</p>
      {/* prettier-ignore */}
      <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Average Rating</p>
    </div>
  );
};

export const DashboardListCard = ({ data, index, publiced }) => {
  const [{ user }, dispatch] = useStateValue();
  const [isDeleted, setIsDeleted] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);
  const tracks = data.list_tracks;

  const deleteObject = (id) => {
    console.log(id);
    deleteListById(id).then((res) => {
      console.log(res.data);
      if (res.data.success) {
        setAlert("success");
        setAlertMsg(res.data.msg);
        getAllUserLists().then((data) => {
          dispatch({
            type: actionType.SET_ALL_USERLISTS,
            allUserLists: data.data,
          });
        });
        setTimeout(() => {
          setAlert(false);
        }, 4000);
      } else {
        setAlert("error");
        setAlertMsg(res.data.msg);
        setTimeout(() => {
          setAlert(false);
        }, 4000);
      }
    });
  };

  const navigate = useNavigate();

  return (
    <details className="relative w-full rounded-md flex items-center justify-between cursor-pointer hover:shadow-md">
      <summary className="inline">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="w-full rounded-md flex items-center justify-between py-4 cursor-pointer hover:shadow-md"
        >
          {isDeleted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="absolute z-10 inset-0 bg-gray-200 flex flex-col gap-6 items-center justify-center"
            >
              <span className="text-sm text-center text-textColor font-semibold">
                Are you sure do you want to delete this list?
              </span>

              <div className="flex items-center gap-3">
                <button
                  className="text-sm px-4 py-1 rounded-md text-white hover:shadow-md bg-teal-400"
                  onClick={() => {
                    setIsDeleted(false);
                    deleteObject(data._id);
                  }}
                >
                  Yes
                </button>
                <button
                  className="text-sm px-4 py-1 rounded-md text-white hover:shadow-md bg-gray-400"
                  onClick={(e) => setIsDeleted(false)}
                >
                  No
                </button>
              </div>
            </motion.div>
          )}

          <span className="text-base text-textColor w-275 min-w-[160px] text-center">
            {data.list_name}
          </span>
          <span className="text-base text-textColor w-275 min-w-[160px] text-center">
            {data.creater_name}
          </span>
          <span className="text-base text-textColor w-275 min-w-[160px] text-center">
            {data.number_of_tracks.toString()}
          </span>
          <span className="text-base text-textColor w-275 min-w-[160px] text-center">
            {data.total_playtime}
          </span>
          <span className="text-base text-textColor w-275 min-w-[160px] text-center">
            {data.average_rate}
          </span>
          {publiced !== "true" &&
            user &&
            (data.user_id === user?.user?._id ||
              user.user.role === "admin") && (
              <div className="w-full absolute flex items-center justify-between px-4">
                <motion.i
                  className="absolute right-4 w-8 h-8 rounded-md flex items-center justify-center bg-gray-200"
                  whileTap={{ scale: 0.75 }}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsDeleted(true);
                  }}
                >
                  <MdDelete className="text-xl text-red-400 hover:text-red-500" />
                </motion.i>
              </div>
            )}
        </motion.div>
      </summary>
      {
        <div className="w-full flex items-center justify-center flex-col bg-gray-200">
          <p className="m-5 font-semibold text-center">{data.description}</p>
          {user && (
            <p>
              <button
                className="bg-sky-600 m-2 mb-2 px-1 text-white hover:bg-sky-800"
                onClick={() => {
                  navigate("/review", { state: data });
                }}
              >
                Write review
              </button>
            </p>
          )}
          <div className="w-full min-w-[750px] flex items-center justify-between">
            {/* prettier-ignore */}
            <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">ID</p>
            {/* prettier-ignore */}
            <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Title</p>
            {/* prettier-ignore */}
            <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Artist</p>
            {/* prettier-ignore */}
            <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Album</p>
            {/* prettier-ignore */}
            <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Duration</p>
          </div>
          <div className="w-full">
            {tracks.map((track, index) => (
              <DashboardTrackCard key={index} data={track} />
            ))}
          </div>
          {data.reviews && (
            <div className="w-full">
              {data.reviews.map((r) => (
                <DashboardReviewCard key={r._id} review={r} />
              ))}
            </div>
          )}
        </div>
      }
    </details>
  );
};

export const DashboardTrackCard = ({ data, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="my-5 relative w-full rounded-md flex items-center justify-between cursor-pointer hover:shadow-md"
    >
      <button
        className="bg-sky-700 m-2 px-1 text-white hover:bg-sky-800"
        onClick={() => playOnYoutube(data.track_title)}
      >
        Play
      </button>
      <p className="text-base text-textColor w-275 min-w-[160px] text-center">
        {data.track_id}
      </p>
      <p className="text-base text-textColor w-275 min-w-[160px] text-center">
        {data.track_title}
      </p>
      <p className="text-base text-textColor w-275 min-w-[160px] text-center">
        {data.artist_name}
      </p>
      <p className="text-base text-textColor w-275 min-w-[160px] text-center">
        {data.album_title}
      </p>
      <p className="text-base text-textColor w-275 min-w-[160px] text-center">
        {data.track_duration}
      </p>
    </motion.div>
  );
};

export const DashboardReviewCard = ({ review }) => {
  return (
    <p className="w-full text-center m-2">
      rating:<span className="font-bold ml-1 mr-2">{review.rate}</span>
      <span className="font-semibold">"{review.content}"</span> by{" "}
      {review.owner}
      <span className="text-gray-300 ml-5">--({review._id})</span>
    </p>
  );
};

export default DashboardLists;
