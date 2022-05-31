import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
// redux
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers";

const store = createStore(
  reducers, // Todos los reducers
  {}, // Estado inical
  applyMiddleware(reduxThunk)
);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
