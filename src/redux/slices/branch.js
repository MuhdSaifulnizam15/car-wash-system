import { map, filter } from "lodash";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// utils
import axios from "utils/axios";

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  branch: [],
  currPage: 0,
  pagingCounter: 0,
  totalPages: 0,
  totalDocs: 0,
  limit: 10,
  hasPrevPage: false,
  hasNextPage: true,
  prevPage: null,
  nextPage: null
};

const slice = createSlice({
  name: "branch",
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

    // GET ALL BRANCH
    getBranchSuccess(state, action) {
      state.isLoading = false;
      state.branch = action.payload;
      state.currPage = action.payload?.page;
      state.totalDocs = action.payload?.totalDocs;
      state.pagingCounter = action.payload?.pagingCounter;
      state.hasPrevPage = action.payload?.hasPrevPage;
      state.hasNextPage = action.payload?.hasNextPage;
      state.prevPage = action.payload?.prevPage;
      state.nextPage = action.payload?.nextPage;
      state.totalPages = action.payload?.totalPages;
    },

    // ADD BRANCH
    addBranchSuccess(state, action) {
      state.isLoading = false;
    },

    // DELETE BRANCH
    deleteBranchSuccess(state, action) {
      state.isLoading = false;
    },

    // UPDATE BRANCH
    updateBranchSuccess(state, action) {
      state.isLoading = false;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions

// ----------------------------------------------------------------------

export function getAllBranch({ page = 1, limit = 10 }) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/branches?page=${page}&limit=${limit}`);
      console.log("response", response.data);
      dispatch(slice.actions.getBranchSuccess(response.data.result));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addBranch(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post("/branches", data);
      console.log("response", response.data);
      dispatch(slice.actions.addBranchSuccess(response.data.branch));

      toast.success("Branch successfully added", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteBranch(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`/branches/delete/${id}`);
      console.log("response", response.data);
      dispatch(slice.actions.deleteBranchSuccess(response.data));

      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateBranch(id, data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`/branches/update/${id}`, data);
      console.log("response", response.data);
      dispatch(slice.actions.updateBranchSuccess(response.data));

      toast.success("Branch successfully updated", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
