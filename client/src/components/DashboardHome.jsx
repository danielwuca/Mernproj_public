import React, { useEffect } from "react";
import {
  getAllAlbums,
  getAllArtists,
  getAllGenres,
  getAllUsers,
  getAllUserLists,
  getAllLocalUsers,
} from "../api";
import { actionType } from "../context/reducer";
import { FaUsers } from "react-icons/fa";
import { useStateValue } from "../context/StateProvider";
import { bgColors } from "../utils/styles";
import { BsCollectionPlay } from "react-icons/bs";

export const DashboardCard = ({ icon, name, count }) => {
  const bg_color = bgColors[parseInt(Math.random() * bgColors.length)];

  return (
    <div
      style={{ background: `${bg_color}` }}
      className={`p-4 w-40 gap-3 h-auto rounded-lg shadow-md flex flex-col items-center justify-center`}
    >
      {icon}
      <p className="text-xl font-semibold text-textColor">{name}</p>
      <p className="text-xl text-textColor">{count}</p>
    </div>
  );
};

const DashboardHome = () => {
  const [{ allUsers, allLocalUsers, allUserLists }, dispatch] = useStateValue();

  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        console.log(data);
        dispatch({
          type: actionType.SET_ALL_USERS,
          allUsers: data.users,
        });
      });
    }

    if (!allUserLists) {
      getAllUserLists().then((data) => {
        console.log(data);
        dispatch({
          type: actionType.SET_ALL_USERLISTS,
          allUserLists: data.data,
        });
      });
    }

    if (!allLocalUsers) {
      getAllLocalUsers().then((data) => {
        console.log(data);
        dispatch({
          type: actionType.SET_ALL_LOCALUSERS,
          allLocalUsers: data.users,
        });
      });
    }
  }, []);

  return (
    <div className="w-full p-6 flex items-center justify-evenly flex-wrap">
      <DashboardCard
        icon={<FaUsers className="text-3xl text-textColor" />}
        name={"Users"}
        count={
          allUsers?.length + allLocalUsers?.length > 0
            ? allUsers?.length + allLocalUsers?.length
            : 0
        }
      />
      <DashboardCard
        icon={<BsCollectionPlay className="text-3xl text-textColor" />}
        name={"Lists"}
        count={allUserLists?.length > 0 ? allUserLists?.length : 0}
      />
    </div>
  );
};

export default DashboardHome;
