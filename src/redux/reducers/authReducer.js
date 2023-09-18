import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  isLogin: JSON.parse(localStorage.getItem("CURRENT_ADMIN_USER"))
    ? true
    : false,
  userLogin: JSON.parse(localStorage.getItem("CURRENT_ADMIN_USER")) || {},
};

const authReducer = createSlice({
  name: "authenticate",
  initialState,
  reducers: {
    onLogin: (state, { actionType, payload }) => {
      // lưu vào local Storage
      localStorage.setItem(
        "CURRENT_ADMIN_USER",
        JSON.stringify({
          ...payload.result,
          isLogin: true,
          accessToken: payload.accessToken,
        })
      );

      //lưu vào cookie
      Cookies.set("accessTokenAdmin", payload.accessToken, { expires: 1 });

      // set lại reducer Auth
      state.isLogin = true;
      state.userLogin = {
        ...payload.result,
        isLogin: true,
        accessToken: payload.accessToken,
      };
    },

    onLogout: (state) => {
      localStorage.removeItem("CURRENT_ADMIN_USER");
      Cookies.remove("accessTokenAdmin");
      state.isLogin = false;
      state.userLogin = {};
    },
  },
});

export const { onLogin, onLogout } = authReducer.actions;

export default authReducer.reducer;
