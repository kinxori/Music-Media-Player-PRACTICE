const Loading = () => {
  return (
    <div className="flex items-center justify-center  w-screen   h-screen bg-zinc-900 fixed z-10 top-0 left-0   ">
      <h3>Loading&nbsp;&nbsp;&nbsp;</h3>
      <div className="animate-spin rounded-full h-5 w-5 border-t-0 border-b-2  border-white"></div>
    </div>
  );
};

export default Loading;
