import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../utils/apiConfig";
import { toast } from "react-toastify";

const initialState = {
  page: 1,
  perPage: 10,
  orderList: [],
  totalOrder: 0,
  totalPayment: 0,
};

const orderReducer = createSlice({
  name: "order",
  initialState,
  reducers: {
    getOrderList: (state, action) => {
      state.page = action.payload.page;
      state.perPage = action.payload.perPage;
      state.totalOrder = action.payload.totalOrder;
      state.orderList = action.payload.result;
      state.totalPayment = action.payload.totalPayment;
    },
  },
});

export const { getOrderList } = orderReducer.actions;

export default orderReducer.reducer;

// action thunk call API get order list
export const getOrderListThunk = (page, perPage, userId, token) => {
  return async (dispatch) => {
    try {
      const responseApi = await axios({
        url: `${API_BASE_URL}/order/admin/${userId}?page=${page}&perPage=${perPage}`,
        method: "GET",
        headers: {
          accessToken: token,
        },
      });

      // console.log("responseApi", responseApi);
      if (responseApi.data.status) {
        dispatch(
          getOrderList({
            result: responseApi.data.result,
            page,
            perPage,
            totalOrder: responseApi.data.totalOrder,
            totalPayment: responseApi.data.totalPayment,
          })
        );
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.message);
    }
  };
};
