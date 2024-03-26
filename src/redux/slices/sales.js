import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

// utils
import axios from 'utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  sales: [],
  currPage: 0,
  pagingCounter: 0,
  totalPages: 0,
  totalDocs: 0,
  limit: 10,
  hasPrevPage: false,
  hasNextPage: true,
  prevPage: null,
  nextPage: null,
};

const slice = createSlice({
  name: 'sales',
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

    // GET SALES
    getSalesSuccess(state, action) {
      state.isLoading = false;
      state.sales = action.payload;
      state.currPage = action.payload?.page;
      state.totalDocs = action.payload?.totalDocs;
      state.pagingCounter = action.payload?.pagingCounter;
      state.hasPrevPage = action.payload?.hasPrevPage;
      state.hasNextPage = action.payload?.hasNextPage;
      state.prevPage = action.payload?.prevPage;
      state.nextPage = action.payload?.nextPage;
      state.totalPages = action.payload?.totalPages;
    },

    // ADD SALES
    addSalesSuccess(state, action) {
      state.isLoading = false;
    },

    // DELETE SALES
    deleteSalesSuccess(state, action) {
      state.isLoading = false;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions

// ----------------------------------------------------------------------

export function getAllSales({
  page = 1,
  userId = '',
  sortBy = '',
  start_date = '',
  end_date = '',
  branchId = ''
}) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      let url = `/sales?page=${page}`;
      if (userId)
        url += `&userId=${userId}`;
      if (sortBy)
        url += `&sortBy=${sortBy}`;
      if (start_date)
        url += `&start_date=${dayjs(start_date).format('YYYY-MM-DD')}`;
      if (end_date)
        url += `&end_date=${dayjs(end_date).format('YYYY-MM-DD')}`;
      if (branchId && branchId !== 'all')
        url += `&branch_id=${branchId}`;

      console.log('url', url);

      const response = await axios.get(url);
      console.log('response', response.data);
      dispatch(slice.actions.getSalesSuccess(response.data.result));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addSales(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/sales', data);
      console.log('response', response.data);
      dispatch(slice.actions.addSalesSuccess(response.data.sale));

      toast.success('Sales successfully added', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
      toast.error(error.message, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };
}

export function deleteSales(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`/sales/delete/${id}`);
      console.log('response', response.data);
      dispatch(slice.actions.deleteSalesSuccess(response.data));

      toast.success(response.data.message, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
