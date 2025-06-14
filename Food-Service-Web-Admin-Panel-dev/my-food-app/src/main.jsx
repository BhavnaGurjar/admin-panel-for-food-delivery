import { createRoot } from "react-dom/client";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { StrictMode } from "react";
import store from "./store.js";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
