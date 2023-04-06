import { React, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import Header from "../Header";
import { useStateValue } from "../../context/StateProvider";

export const playOnYoutube = (title) => {
  window.open("https://music.youtube.com/search?q=" + title);
};

const Tracks = () => {
  const [tracks, setTracks] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [{ user }, dispatch] = useStateValue();

  const schema = yup
    .object()
    .shape({
      search: yup.string().required(),
    })
    .required();

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (form) => {
    try {
      await axios
        .get("/api/tracks?search=" + form.search + "&max=" + form.max)
        .then((res) => {
          console.log(res.data);
          setTracks(res.data.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const [detailsIsOpen, setDetailsIsOpen] = useState(false);
  function openDetailsModal(data) {
    setDetails(data);
    setDetailsIsOpen(true);
  }

  function closeDetailsModal() {
    setDetailsIsOpen(false);
  }

  const [favoritesIsOpen, setFavoritesIsOpen] = useState(false);

  const favoritesSchema = yup
    .object()
    .shape({
      list_name: yup.string().required(),
      description: yup.string(),
    })
    .required();

  const { register: registerFavorites, handleSubmit: handleFavoritesSubmit } =
    useForm({
      resolver: yupResolver(favoritesSchema),
    });

  const onFavoritesSubmit = async (form) => {
    try {
      form.ids = [...favorites];
      form.creater_name = user.user.name;
      form.user_id = user.user._id;
      console.log(form);
      await axios.post("/api/lists/", form).then((res) => {
        console.log(res.data);
      });
      closeFavoritesModal();
    } catch (error) {
      console.log(error);
    }
  };

  function favoritesToString(array) {
    return [...array].map((k) => '"' + k + '" ');
  }

  function FavoriteModal() {
    return (
      <form onSubmit={handleFavoritesSubmit(onFavoritesSubmit)}>
        <p className="p-2 m-2">ids: {favoritesToString(favorites)}</p>
        <p className="p-2 m-2">
          name: <input {...registerFavorites("list_name")} type="text"></input>
        </p>
        <p className="p-2 m-2">
          description:{" "}
          <input {...registerFavorites("description")} type="text"></input>
        </p>
        <p className="p-2 m-2">
          public:
          <select {...registerFavorites("public")} className="m-2">
            <option value="false">false</option>
            <option value="true">true</option>
          </select>
        </p>
        <input
          type="submit"
          className="bg-sky-700 px-2 py-1 m-2 text-white hover:bg-sky-800"
        />
      </form>
    );
  }

  function openFavoritesModal() {
    if (favorites.size > 0) {
      setFavoritesIsOpen(true);
    }
  }

  function closeFavoritesModal() {
    setFavoritesIsOpen(false);
  }

  const [details, setDetails] = useState({});

  function DetailsModal() {
    return Object.keys(details).map((key, i) => (
      <p key={i}>
        <span>"{key}" : </span>
        <span>"{details[key]}"</span>
      </p>
    ));
  }

  function like(data) {
    if (favorites.size < 20) {
      setFavorites(new Set(favorites).add(data.track_id));
    }
  }

  function Track(props) {
    return (
      <li key={props.data._id}>
        "{props.data.track_title}"
        <button
          className="bg-sky-700 m-2 px-1 text-white hover:bg-sky-800"
          onClick={() => playOnYoutube(props.data.track_title)}
        >
          Play
        </button>
        <button
          className="bg-sky-600 m-2 px-1 text-white hover:bg-sky-800"
          onClick={() => openDetailsModal(props.data)}
        >
          Details
        </button>
        {user?.user && (
          <button
            className="bg-sky-500 m-2 px-1 text-white hover:bg-sky-800"
            onClick={() => like(props.data)}
          >
            Like
          </button>
        )}
      </li>
    );
  }
  Modal.setAppElement("body");

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
      <Header />
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="font-bold text-center">Search musics</h3>
        <br />
        <p>
          <span>Max returns:</span>
          <select {...register("max")} className="m-2">
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </p>
        <p>
          <span>Search content:</span>
          <input {...register("search")} type="text" className="m-2" />
          <input
            type="submit"
            className="bg-sky-700 px-2 py-1 m-2 text-white hover:bg-sky-800"
          />
        </p>
      </form>
      {user?.user && (
        <p>
          <span>Current favorites:{favoritesToString(favorites)}</span>
          <button
            className="bg-sky-600 m-5 px-1 text-white hover:bg-sky-800"
            onClick={openFavoritesModal}
          >
            Save list
          </button>
        </p>
      )}
      <ul className="list-disc">
        {tracks.map((track) => (
          <Track key={track._id} data={track} />
        ))}
      </ul>
      <Modal
        isOpen={detailsIsOpen}
        onRequestClose={closeDetailsModal}
        contentLabel="Details"
      >
        <p className="text-right">
          <button
            className="bg-sky-600 m-2 px-1 text-white hover:bg-sky-800"
            onClick={closeDetailsModal}
          >
            close
          </button>
        </p>
        <div>
          <DetailsModal />
        </div>
      </Modal>
      <Modal
        isOpen={favoritesIsOpen}
        onRequestClose={closeFavoritesModal}
        contentLabel="favorites"
      >
        <p className="text-right">
          <button
            className="bg-sky-600 m-2 px-1 text-white hover:bg-sky-800"
            onClick={closeFavoritesModal}
          >
            close
          </button>
        </p>
        <div className="bg-gray-200 p-2">
          <FavoriteModal />
        </div>
      </Modal>
    </div>
  );
};

export default Tracks;
