import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../utils/apiConfig";
import { toast } from "react-toastify";

const initialState = {
  page: 1,
  perPage: 10,
  userList: [],
  totalClient: 0,
  message: "",
};

const userReducer = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUserList: (state, action) => {
      state.page = action.payload.page;
      state.perPage = action.payload.perPage;
      state.userList = action.payload.result;
      state.totalClient = action.payload.totalClient;
    },
  },
});

export const { getUserList } = userReducer.actions;

export default userReducer.reducer;

// Tạo action thunk call API get list Users getUserListThunk
export const getUserListThunk = (page, perPage, userId, token) => {
  return async (dispatch) => {
    try {
      const responseApi = await axios({
        url: `${API_BASE_URL}/user/client/${userId}?page=${page}&perPage=${perPage}`,
        method: "GET",
        headers: {
          accessToken: token,
        },
      });

      // console.log("responseApi", responseApi);
      if (responseApi.data.status) {
        dispatch(
          getUserList({
            result: responseApi.data.result,
            page,
            perPage,
            totalClient: responseApi.data.totalClient,
          })
        );
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.message);
    }
  };
};
