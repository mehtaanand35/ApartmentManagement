import * as types from "./ActionType";
import axios from "axios";


const getData = (data) => ({
  type: types.GET_DATA,
  payload: data,
});

export const loadData = () => {
  return function (dispatch) {
    axios
      .get(`http://localhost:8080/api/detail`)
      .then((res) => {
        console.log("res", res);
        dispatch(getData(res.data));
      })
      .catch((err) => console.log(err));
  };
};
