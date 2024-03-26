import { map, filter } from "lodash";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// utils
import axios from "utils/axios";

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  categories: [],
};

const slice = createSlice({
  name: "category",
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

    // GET ALL CATEGORY
    getAllCategorySuccess(state, action) {
      state.isLoading = false;
      state.categories = action.payload;
    },

    // ADD CATEGORY
    addCategorySuccess(state, action) {
      state.isLoading = false;
    },

    // DELETE CATEGORY
    deleteCategorySuccess(state, action) {
      state.isLoading = false;
    },

    // UPDATE CATEGORY
    updateCategorySuccess(state, action) {
      state.isLoading = false;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions

// ----------------------------------------------------------------------

export function getAllCategories() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("/categories");
      console.log("response", response.data);
      dispatch(slice.actions.getAllCategorySuccess(response.data.result));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addCategory(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post("/categories", data);
      console.log("response", response.data);
      dispatch(slice.actions.addCategorySuccess(response.data.category));

      toast.success("Category successfully added", {
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

export function deleteCategory(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`/categories/delete/${id}`);
      console.log("response", response.data);
      dispatch(slice.actions.deleteCategorySuccess(response.data));

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

export function updateCategory(id, data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`/categories/update/${id}`, data);
      console.log("response", response.data);
      dispatch(slice.actions.updateCategorySuccess(response.data));

      toast.success("Category successfully updated", {
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