import * as types from "./ActionType";
const initialState = {
  flats: [],
  flat: {},
  loading: true,
};

const AdminReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_DATA:
      return {
        ...state,
        flats: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default AdminReducers;
