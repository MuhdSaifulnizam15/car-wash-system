import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import dayjs from "dayjs";

// utils
import axios from 'utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  staff: [],
  staff_stats: [],
  staff_info: {},
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
  name: 'staff',
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

    // GET ALL STAFF
    getStaffSuccess(state, action) {
      state.isLoading = false;
      state.staff = action.payload;
      state.currPage = action.payload?.page;
      state.totalDocs = action.payload?.totalDocs;
      state.pagingCounter = action.payload?.pagingCounter;
      state.hasPrevPage = action.payload?.hasPrevPage;
      state.hasNextPage = action.payload?.hasNextPage;
      state.prevPage = action.payload?.prevPage;
      state.nextPage = action.payload?.nextPage;
      state.totalPages = action.payload?.totalPages;
    },

    // GET STAFF INFO
    getStaffInfoSuccess(state, action) {
      state.isLoading = false;
      state.staff_info = action.payload;
    },

    // ADD STAFF
    addStaffSuccess(state, action) {
      state.isLoading = false;
    },

    // DELETE STAFF
    deleteStaffSuccess(state, action) {
      state.isLoading = false;
    },

    // UPDATE STAFF
    updateStaffSuccess(state, action) {
      state.isLoading = false;
    },

    // GET STAFF SALES STATISTICS
    getStaffSalesStatictics(state, action) {
      state.isLoading = false;
      state.staff_stats = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions

// ----------------------------------------------------------------------

export function getAllStaff({ page = 1, limit = 10, branch = '', sortBy = '', }) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      let url = `/staff?page=${page}`;
      if (limit) url += `&userId=${limit}`;
      if (sortBy) url += `&sortBy=${sortBy}`;
      if (branch) url += `&branch_id=${branch}`;

      console.log('url', url);

      const response = await axios.get(url);
      console.log('response', response.data);
      dispatch(slice.actions.getStaffSuccess(response.data.result));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getStaffById(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/staff/user/${id}`);
      console.log('response', response.data);
      dispatch(slice.actions.getStaffInfoSuccess(response.data.staff));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addStaff(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/staff', data);
      console.log('response', response.data);
      dispatch(slice.actions.addStaffSuccess(response.data.staff));

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

export function deleteStaff(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`/staff/delete/${id}`);
      console.log('response', response.data);
      dispatch(slice.actions.deleteStaffSuccess(response.data));

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

export function updateStaff(id, data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`/staff/update/${id}`, data);
      console.log('response', response.data);
      dispatch(slice.actions.updateStaffSuccess(response.data));

      toast.success('Staff successfully updated', {
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

export function getStaffSalesStatictics({ startDate, endDate, branch = '' }) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
     let url = `/staff/sales?`;
      if (startDate) url += `startDate=${dayjs(startDate).format('YYYY-MM-DD')}`;
      if (endDate) url += `&endDate=${dayjs(endDate).format('YYYY-MM-DD')}`;
      if (branch && branch !== 'all') url += `&branch_id=${branch}`;

      const response = await axios.get(url);
      console.log('response', response.data);
      dispatch(slice.actions.getStaffSalesStatictics(response.data.result));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
