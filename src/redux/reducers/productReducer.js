import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../utils/apiConfig";
import { toast } from "react-toastify";

const initialState = {
  page: 1,
  perPage: 10,
  productList: [],
  totalProduct: 0,
  searchWord: "",
};

const productReducer = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProductList: (state, action) => {
      state.page = action.payload.page;
      state.perPage = action.payload.perPage;
      state.productList = action.payload.result;
      state.totalProduct = action.payload.totalProduct;
      state.searchWord = action.payload.searchWord;
    },
  },
});

export const { getProductList } = productReducer.actions;

export default productReducer.reducer;

// action thunk để call API get product list
export const getProductListThunk = (page, perPage, searchWord) => {
  return async (dispatch) => {
    try {
      const responseApi = await axios({
        url: `${API_BASE_URL}/product?page=${page}&perPage=${perPage}&searchWord=${searchWord}`,
        method: "GET",
        // headers: {
        //   accessToken: token,
        // },
      });

      //   console.log("responseApi", responseApi);
      if (responseApi.data.status) {
        dispatch(
          getProductList({
            result: responseApi.data.result,
            page,
            perPage,
            totalProduct: responseApi.data.total,
            searchWord,
          })
        );
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.message);
    }
  };
};
