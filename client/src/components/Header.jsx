import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { Logo } from "../assets/img";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { FaCrown } from "react-icons/fa";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { getAuth } from "firebase/auth";
import { app } from "../config/firebase.config";
import { motion } from "framer-motion";

const Header = () => {
  const [{ user }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false);

  const navigate = useNavigate();

  const avatorUrl = user?.user?.imageURL
    ? user?.user?.imageURL
    : "/logo192.png";

  const logOut = () => {
    const firebaseAuth = getAuth(app);
    firebaseAuth
      .signOut()
      .then(() => {
        window.localStorage.removeItem("auth");
        window.localStorage.removeItem("token");
        dispatch({
          type: actionType.SET_USER,
          user: null,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    navigate("/welcome", { replace: true });
  };

  return (
    <header className="flex items-center w-full p-4 md:py-2 md:px-6 bg-white">
      <NavLink to={"/"}>
        <img src={Logo} alt="Logo" className="w-45 h-16" />
      </NavLink>

      <ul className="flex items-center justify-center ml-7">
        <li className="mx-5 text-purple-500">
          <NavLink
            to={"/home"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            Home
          </NavLink>
        </li>
        <li className="mx-5 text-purple-500">
          <NavLink
            to={"/tracks"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            Musics
          </NavLink>
        </li>
        <li className="mx-5 text-purple-500">
          <NavLink
            to={"/publiclist"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            Public List
          </NavLink>
        </li>
        <li className="mx-5 text-purple-500">
          <NavLink
            to={"/dmca"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            DMCA
          </NavLink>
        </li>
      </ul>

      <div
        onMouseEnter={() => setIsMenu(true)}
        onMouseLeave={() => setIsMenu(false)}
        className="flex items-center ml-auto cursor-pointer gap-2 relative"
      >
        <img
          src={avatorUrl}
          className="w-12 min-w-[44px] object-cover rounded-full shadow-lg"
          alt=""
          referrerPolicy="no-referrer"
        />
        <div className="flex flex-col">
          <p className="text-textColor text-lg hover:text-headingColor font-semibold">
            {user?.user?.name ? user?.user?.name : "Guest"}
          </p>
          <p className="flex items-center gap-2 text-xs text-gray-500 font-normal">
            Login-in User.
            <FaCrown className="text-sm -ml-1 text-yellow-500" />
          </p>
        </div>
        {isMenu && user && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute z-10 top-12 right-0 w-275 p-4 gap-4 bg-card shadow-lg rounded-lg backdrop-blur-sm flex flex-col"
          >
            {user?.user?.role === "admin" && (
              <>
                <NavLink to={"/dashboard/home"}>
                  <p className="text-base text-textColor hoer:font-semibold duration-150 transition-all ease-in-out">
                    Dashboard
                  </p>
                </NavLink>
                <hr />
              </>
            )}

            {user?.user?.role && (
              <>
                <NavLink to={"/likelist"}>
                  <p className="text-base text-textColor hoer:font-semibold duration-150 transition-all ease-in-out">
                    Personal like list
                  </p>
                </NavLink>
                <hr />
              </>
            )}

            <p
              className="text-base text-textColor hoer:font-semibold duration-150 transition-all ease-in-out"
              onClick={logOut}
            >
              Sign Out
            </p>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
