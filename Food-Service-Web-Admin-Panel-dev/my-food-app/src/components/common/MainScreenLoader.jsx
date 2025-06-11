const MainScreenLoader = () => {
  return (
    <div className="fixed h-full w-full inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="w-16 h-16 border-4 border-white border-dashed rounded-full animate-spin"></div>
    </div>
  );
};

export default MainScreenLoader;
