import { map, filter } from "lodash";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// utils
import axios from "utils/axios";

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  staff: [],
};

const slice = createSlice({
  name: "staff",
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
  },
});

// Reducer
export default slice.reducer;

// Actions

// ----------------------------------------------------------------------

export function getAllStaff() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("/staff");
      console.log("response", response.data);
      dispatch(slice.actions.getStaffSuccess(response.data.result));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addStaff(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post("/staff", data);
      console.log("response", response.data);
      dispatch(slice.actions.addStaffSuccess(response.data.staff));

      toast.success("Staff successfully added", {
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

export function deleteStaff(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`/staff/delete/${id}`);
      console.log("response", response.data);
      dispatch(slice.actions.deleteStaffSuccess(response.data));

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

export function updateStaff(id, data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`/staff/update/${id}`, data);
      console.log("response", response.data);
      dispatch(slice.actions.updateStaffSuccess(response.data));

      toast.success("Staff successfully updated", {
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