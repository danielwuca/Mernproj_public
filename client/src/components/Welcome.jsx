import React , { useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

const Welcome = () => {
  let navigate = useNavigate();
  const check = useRef();
  const prompt_check = useRef();
  function routeChange(addr) {
    if (check.current.checked) {
      navigate(addr);
    } else {
      prompt_check.current.className = "animate-pulse bg-gray-300 cursor-pointer";
    }
  }

  useEffect( () => {
    if (localStorage.getItem("auth") === "true") {
      navigate("/home");
      return;
    }
  });

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden py-6 sm:py-12">
      <div className="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
        <div className="mx-auto max-w-md">
          <div className="divide-y divide-gray-300/50">
            <div className="space-y-6 py-8 text-base leading-7 text-gray-600">
              <p className="text-lg font-semibold">
                Wellcome to FREE MUSIC ARCHIVE player
              </p>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <svg
                    className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="11" />
                    <path
                      d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9"
                      fill="none"
                    />
                  </svg>
                  <p className="ml-4">you can find and play music from FMA</p>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="11" />
                    <path
                      d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9"
                      fill="none"
                    />
                  </svg>
                  <p className="ml-4">you can create play-list</p>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="11" />
                    <path
                      d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9"
                      fill="none"
                    />
                  </svg>
                  <p className="ml-4">
                    you can write review for public play-list
                  </p>
                </li>
              </ul>
            </div>
            <div className="pt-8 pb-3 text-base font-semibold leading-7">
              <p className="text-gray-900">Login as:</p>
              <p className="text-center">
                <button
                  onClick={() => routeChange("/locallogin")}
                  className="m-2 mr-6 bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3"
                >
                  User
                </button>
                <button
                  onClick={() => routeChange("/home")}
                  className="m-2 ml-6 bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3"
                >
                  Guest
                </button>
              </p>
              <input className="m-2 " type="checkbox" ref={check}/>
              <span className="cursor-pointer" ref={prompt_check} onClick={(e) => {check.current.checked = !check.current.checked}}>
                i agree to the <Link className="text-sky-500" to="/aup.html" target="_blank">use policy</Link></span>
            </div>
            <div className="pt-8 text-base font-semibold leading-7">
              <p>
                <a
                  href="https://freemusicarchive.org/"
                  className="text-sky-500 hover:text-sky-600"
                >
                  Free Music Archive &rarr;
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
