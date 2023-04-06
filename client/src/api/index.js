import axios from "axios";

export const validateUser = async (token) => {
  try {
    const res = await axios.get(`/api/users/`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const validateLocalUser = async (token) => {
  try {
    const res = await axios.get(`/api/localauth/`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async () => {
  try {
    const res = await axios.get(`/api/users/all`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAllLocalUsers = async () => {
  try {
    const res = await axios.get(`/api/localusers/`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAllArtists = async () => {
  try {
    const res = await axios.get(`/api/artists/`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAllSongs = async () => {
  try {
    const res = await axios.get(`/api/tracks`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAllAlbums = async () => {
  try {
    const res = await axios.get(`/api/albums/`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAllGenres = async () => {
  try {
    const res = await axios.get(`/api/genres/`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const changingUserRole = async (userId, role) => {
  try {
    const res = await axios.put(`/api/users/role/${userId}`, {
      data: { role: role },
    });
    return res.data;
  } catch (error) {
    return null;
  }
};

export const changingLocalUserRole = async (userId, role) => {
  try {
    const res = await axios.put(`/api/localusers/role/${userId}`, {
      data: { role: role },
    });
    return res.data;
  } catch (error) {
    return null;
  }
};

export const changingUserActivated = async (userId, activated) => {
  try {
    const res = await axios.put(`/api/users/activate/${userId}`, {
      data: { activated: activated },
    });
    return res.data;
  } catch (error) {
    return null;
  }
};

export const changingLocalUserActivated = async (userId, activated) => {
  try {
    const res = await axios.put(`/api/localusers/activate/${userId}`, {
      data: { activated: activated },
    });
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAllUserLists = async (id) => {
  try {
    const res = await axios.get("/api/lists/" + (id ? "?id=" + id : ""));
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAllPublicLists = async (max) => {
  try {
    const res = await axios.get(
      "/api/lists/public" + (max ? `?max=${max}` : "")
    );
    return res.data;
  } catch (error) {
    return null;
  }
};

export const deleteListById = async (id) => {
  try {
    const res = await axios.delete(`/api/lists/${id}`);
    return res;
  } catch (error) {
    return null;
  }
};

export const getCopyrightComplaints = async () => {
  try {
    const res = await axios.get(`/api/copyright_complaint`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const saveNewList = async (data) => {
  try {
    const res = axios.post(`api/lists/`, { ...data });
    return (await res).data;
  } catch (error) {
    return null;
  }
};
