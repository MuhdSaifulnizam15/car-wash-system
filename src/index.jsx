import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "styles/tailwind.css";
import "react-toastify/dist/ReactToastify.css";
import 'react-calendar/dist/Calendar.css';

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "redux/store";
import { AuthProvider } from "contexts/JWTContext";
import { IS_PROD } from "constants/config";

if (IS_PROD) console.log = () => {};

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <ToastContainer />
          <App />
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
