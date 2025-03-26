const initialState = {
  songs: [],
  currentSong: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SONGS":
      return { ...state, songs: action.payload };
    case "SET_CURRENT_SONG":
      return { ...state, currentSong: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
