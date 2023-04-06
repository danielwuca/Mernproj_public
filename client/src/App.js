import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
  Login,
  Welcome,
  Home,
  Dashboard,
  Tracks,
  Dmca,
  CopyrightComplaint,
  PublicLists,
  Likelist,
  Review,
  ForgotPassword,
  PasswordReset,
} from "./components";

import { app } from "./config/firebase.config";

import { AnimatePresence } from "framer-motion";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { validateUser, validateLocalUser } from "./api";
import { useStateValue } from "./context/StateProvider";
import { actionType } from "./context/reducer";

// local part
import Signup from "./components/Signup/index";
import Locallogin from "./components/Locallogin/index";
import EmailVerify from "./components/EmailVerify/index";

const App = () => {
  const localToken = localStorage.getItem("token");
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();

  const [{ user }, dispatch] = useStateValue();

  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );

  useEffect(() => {
    if (localToken) {
      validateLocalUser(localToken).then((data) => {
        if (data) {
          setAuth(true);
          dispatch({
            type: actionType.SET_USER,
            user: { user: data.data },
          });
          navigate("/home");
        }
      });
    } else {
      firebaseAuth.onAuthStateChanged((userCred) => {
        if (userCred) {
          userCred.getIdToken().then((token) => {
            validateUser(token).then((data) => {
              dispatch({
                type: actionType.SET_USER,
                user: data,
              });
            });
          });
        } else {
          window.localStorage.setItem("auth", false);
          setAuth(false);
          dispatch({
            type: actionType.SET_USER,
            user: null,
          });
        }
      });
    }
  }, []);

  return (
    <AnimatePresence mode="wait">
      <div className="h-auto min-w-[680px] bg-primary flex justify-center items-center">
        <Routes>
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<Welcome />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/tracks" element={<Tracks />} />
          <Route path="/dmca" element={<Dmca />} />
          <Route path="/publiclist" element={<PublicLists />} />
          <Route path="/copyright_complaint" element={<CopyrightComplaint />} />
          <Route path="/localsignup" element={<Signup />} />
          <Route
            path="/locallogin"
            element={<Locallogin setAuth={setAuth} />}
          />
          <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
          <Route path="/likelist" element={<Likelist />} />
          <Route path="/review" element={<Review />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/password-reset/:id/:token"
            element={<PasswordReset />}
          />
        </Routes>
      </div>
    </AnimatePresence>
  );
};

export default App;
