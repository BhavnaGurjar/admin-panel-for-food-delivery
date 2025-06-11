import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-column items-center justify-center"
      style={{ height: "100vh" }}
    >
      <h2 className="font-poppins">Home</h2>
      <button
        onClick={() => {
          navigate("/auth/log-in");
        }}
        className="bg-custom-primary text-white border-0 px-4 py-2 rounded"
      >
        Log In
      </button>
    </div>
  );
};

export default Home;
