import { React } from "react";
import Header from "./Header";
import { HomeBg } from "../assets/video";

const Home = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
      <Header />
      <div>
        <div>
          <video
            src={HomeBg}
            type="video/mp4"
            autoPlay
            muted
            loop
            className="w-full h-full obj-cover"
          ></video>
        </div>
        <div className="bg-purple-600 md:py-3 text-textColor p-2">
          <button
            className="w-50 bg-purple-600 text-yellow-300 text-3xl"
            onClick={() => (window.location.href = "https://music.uwo.ca/")}
          >
            Click to contact western music
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
