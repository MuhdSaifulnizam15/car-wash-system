import { map, filter } from "lodash";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// utils
import axios from "utils/axios";

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  services: [],
};

const slice = createSlice({
  name: "services",
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

    // GET SERVICE
    getServicesSuccess(state, action) {
      state.isLoading = false;
      state.services = action.payload;
    },

    // ADD SERVICE
    addServiceSuccess(state, action) {
      state.isLoading = false;
    },

    // DELETE SERVICE
    deleteServiceSuccess(state, action) {
      state.isLoading = false;
    },

    // UPDATE SERVICE
    updateServiceSuccess(state, action) {
      state.isLoading = false;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions

// ----------------------------------------------------------------------

export function getAllServices() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("/services");
      console.log("response", response.data);

      // add quantity object
      response.data.result.docs.forEach((v) => {
        v.quantity = 1;
      });
      dispatch(slice.actions.getServicesSuccess(response.data.result));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addService(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post("/services", data);
      console.log("response", response.data);
      dispatch(slice.actions.addServiceSuccess(response.data.service));

      toast.success("Service successfully added", {
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

export function deleteService(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`/services/delete/${id}`);
      console.log("response", response.data);
      dispatch(slice.actions.deleteServiceSuccess(response.data));

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

export function updateService(id, data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`/services/update/${id}`, data);
      console.log("response", response.data);
      dispatch(slice.actions.updateServiceSuccess(response.data));

      toast.success("Service successfully updated", {
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
