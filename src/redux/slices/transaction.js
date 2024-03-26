import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

// utils
import axios from "utils/axios";

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  transaction: null,
  services: null,
};

const slice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET TOTAL SALES CHART DATA
    getTotalSalesSuccess(state, action) {
      state.isLoading = false;
      state.transaction = action.payload;
    },

    // GET TOTAL SALES BY SERVICES CHART DATA
    getTotalSalesByServiceSuccess(state, action) {
      state.isLoading = false;
      state.services = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions

// ----------------------------------------------------------------------

export function getTotalSalesChart({ type = 'daily', branch = '' }) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      let url = `/sales/chart/${type}`;
      if (branch && branch !== 'all') url += `?branch_id=${branch}`;
      const response = await axios.get(url);
      console.log("response", response.data);
      dispatch(slice.actions.getTotalSalesSuccess(response.data.chart));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getTotalSalesByServiceChart({ startDate, endDate, branch = '' }) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      let url = `/services/chart/data?`;
      if (startDate) url += `startDate=${dayjs(startDate).format('YYYY-MM-DD')}`;
      if (endDate) url += `&endDate=${dayjs(endDate).format('YYYY-MM-DD')}`;
      if (branch && branch !== 'all') url += `&branch_id=${branch}`;

      const response = await axios.get(url);
      console.log("response", response.data);
      dispatch(slice.actions.getTotalSalesByServiceSuccess(response.data.chart));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
