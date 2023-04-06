export const actionType = {
  SET_USER: "SET_USER",
  SET_ALL_USERS: "SET_ALL_USERS",
  SET_ALL_LOCALUSERS: "SET_ALL_LOCALUSERS",
  SET_ALL_ARTISTS: "SET_ALL_ARTISTS",
  SET_ALL_ALBUMS: "SET_ALL_ALBUMS",
  SET_ALL_SONGS: "SET_ALL_SONGS",
  SET_ALL_GENRES: "SET_ALL_GENRES",
  SET_ALL_PUBLICLISTS: "SET_ALL_PUBLICLISTS",
  SET_ALL_USERLISTS: "SET_ALL_USERLISTS",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    case actionType.SET_ALL_USERS:
      return {
        ...state,
        allUsers: action.allUsers,
      };

    case actionType.SET_ALL_LOCALUSERS:
      return {
        ...state,
        allLocalUsers: action.allLocalUsers,
      };

    case actionType.SET_ALL_ARTISTS:
      return {
        ...state,
        allArtists: action.allArtists,
      };

    case actionType.SET_ALL_PUBLICLISTS:
      return {
        ...state,
        allPublicLists: action.allPublicLists,
      };

    case actionType.SET_ALL_USERLISTS:
      return {
        ...state,
        allUserLists: action.allUserLists,
      };

    case actionType.SET_ALL_ALBUMS:
      return {
        ...state,
        allAlbums: action.allAlbums,
      };

    case actionType.SET_ALL_SONGS:
      return {
        ...state,
        allSongs: action.allSongs,
      };

    case actionType.SET_ALL_GENRES:
      return {
        ...state,
        allGenres: action.allGenres,
      };

    default:
      return state;
  }
};

export default reducer;
