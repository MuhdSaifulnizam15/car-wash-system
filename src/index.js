import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "styles/index.css";
import "react-toastify/dist/ReactToastify.css";
import 'react-calendar/dist/Calendar.css'

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "redux/store";
import { AuthProvider } from "contexts/JWTContext";
import { config } from "constants/config";

if (config.IS_PROD) console.log = () => {};

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <ToastContainer />
          <App />
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
