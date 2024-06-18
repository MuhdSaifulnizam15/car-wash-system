import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
// reducer
import userReducer from "redux/slices/user";
import branchReducer from "redux/slices/branch";
import staffReducer from "redux/slices/staff";
import servicesReducer from "redux/slices/services";
import customerReducer from "redux/slices/customer";
import categoryReducer from "redux/slices/category";
import transactionReducer from "redux/slices/transaction";
import salesReducer from "redux/slices/sales";
import bookingReducer from "redux/slices/booking";

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};

const rootReducer = combineReducers({
  user: userReducer,
  branch: branchReducer,
  staff: staffReducer,
  services: servicesReducer,
  customer: customerReducer,
  category: categoryReducer,
  transaction: transactionReducer,
  sales: salesReducer,
  booking: bookingReducer
});

export { rootPersistConfig, rootReducer };
