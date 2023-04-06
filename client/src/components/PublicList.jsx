import React, { useEffect } from "react";
import { getAllPublicLists } from "../api";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import Header from "./Header";
import { DashboardListCard, DashboardListHeader } from "./DashboardLists";

const PublicList = () => {
  const [{ allPublicLists }, dispatch] = useStateValue();

  useEffect(() => {
    getAllPublicLists().then((data) => {
      dispatch({
        type: actionType.SET_ALL_PUBLICLISTS,
        allPublicLists: data.data,
      });
    });
  }, []);

  return (
    <div className="w-full flex items-center justify-center flex-col">
      <Header />
      <div className="relative w-full py-12 min-h-[400px] overflow-x-scroll scrollbar-thin scrollbar-track-slate-300 scrollbar-thumb-slate-400 my-4 flex flex-col items-center justify-start p-4 border border-gray-300 rounded-md gap-3">
        <DashboardListHeader />
        {allPublicLists &&
          allPublicLists?.map((data, i) => (
            <DashboardListCard key={data._id} data={data} index={i} publiced="true" />
          ))}
      </div>
    </div>
  );
};

export default PublicList;
