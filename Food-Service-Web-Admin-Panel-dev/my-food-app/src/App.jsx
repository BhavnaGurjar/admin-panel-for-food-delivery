import { BrowserRouter as Router } from "react-router-dom";
import ErrorBoundary from "./utils/ErrorBoundary";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoute from "./routes/AppRoute";
import "./index.css";

const App = () => {
  return (
    <Router>
      <ErrorBoundary>
        <AppRoute />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </ErrorBoundary>
    </Router>
  );
};

export default App;
