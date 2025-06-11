import { useNavigate } from "react-router-dom";
import { images } from "../../assets";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
      <img
        src={images.pageNotFound}
        alt="page not found"
        className="max-w-[400px] w-full mb-6"
      />
      <h2 className="text-blue-600 font-satoshi font-bold text-2xl mb-3">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-600">
        It seems the page you're looking for doesn't exist.
      </p>
      <p className="text-gray-600">
        Please check the URL or return to the dashboard.
      </p>
      <button
        className="bg-primary text-white rounded px-5 py-2 mt-5 hover:bg-orange-600 transition"
        onClick={() => navigate("/")}
      >
        Go Back Home
      </button>
    </div>
  );
};

export default PageNotFound;
