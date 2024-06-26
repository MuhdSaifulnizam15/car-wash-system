import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// utils
import axios from 'utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  customers: [],
  customer: null,
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
  name: 'customer',
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

    // GET ALL CUSTOMER
    getAllCustomerSuccess(state, action) {
      state.isLoading = false;
      state.customers = action.payload;
      state.currPage = action.payload?.page;
      state.totalDocs = action.payload?.totalDocs;
      state.pagingCounter = action.payload?.pagingCounter;
      state.hasPrevPage = action.payload?.hasPrevPage;
      state.hasNextPage = action.payload?.hasNextPage;
      state.prevPage = action.payload?.prevPage;
      state.nextPage = action.payload?.nextPage;
      state.totalPages = action.payload?.totalPages;
    },

    // GET CUSTOMER
    getCustomerSuccess(state, action) {
      state.isLoading = false;
      state.customer = action.payload;
    },

    // GET CUSTOMER
    getCustomerFailed(state) {
      state.isLoading = false;
      state.customer = null;
    },

    // ADD CUSTOMER
    addCustomerSuccess(state, action) {
      state.isLoading = false;
    },

    // DELETE CUSTOMER
    deleteCustomerSuccess(state, action) {
      state.isLoading = false;
    },

    // UPDATE CUSTOMER
    updateCustomerSuccess(state, action) {
      state.isLoading = false;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions

// ----------------------------------------------------------------------

export function getAllCustomer({ page = 1, limit = 10 }) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/customer?page=${page}&limit=${limit}`);
      console.log('response', response.data);
      dispatch(slice.actions.getAllCustomerSuccess(response.data.result));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getCustomerByPhoneNo(phone_no) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/customer/check/phone/${phone_no}`);
      console.log('response', response.data);
      dispatch(slice.actions.getCustomerSuccess(response.data.customer));
      return response.customer;
    } catch (error) {
      console.log('error', error);
      dispatch(slice.actions.getCustomerFailed());
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addCustomer(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/customer', data);
      console.log('response', response.data);
      dispatch(slice.actions.addCustomerSuccess(response.data.customer));

      toast.success('Customer successfully added', {
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
    }
  };
}

export function deleteCustomer(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`/customer/delete/${id}`);
      console.log('response', response.data);
      dispatch(slice.actions.deleteCustomerSuccess(response.data));

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

export function updateCustomer(id, data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`/customer/update/${id}`, data);
      console.log('response', response.data);
      dispatch(slice.actions.updateCustomerSuccess(response.data));

      toast.success('Customer successfully updated', {
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
