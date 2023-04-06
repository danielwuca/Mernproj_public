import { React ,useEffect ,useState} from "react";
import Header from "./Header";
import { useStateValue } from "../context/StateProvider";
import { DashboardListCard, DashboardListHeader } from "./DashboardLists";
import { getAllUserLists } from "../api";

const Likelist = () => {
  const [{ user }, dispatch] = useStateValue();
  const [mylist, setList] = useState([]);

  useEffect(() => {
    getAllUserLists(user.user._id).then((res) => {
      console.log(res.data);
      setList(res.data);
    });
  }, []);

  return (
      <div className="w-full flex items-center justify-center flex-col">
        <Header />
        <div className="relative w-full py-12 min-h-[400px] overflow-x-scroll scrollbar-thin scrollbar-track-slate-300 scrollbar-thumb-slate-400 my-4 flex flex-col items-center justify-start p-4 border border-gray-300 rounded-md gap-3">
          <DashboardListHeader />
          {mylist.map((data, i) => (
              <DashboardListCard key={data._id} data={data} index={i} />
            ))}
        </div>
      </div>
    );
};

export default Likelist;
