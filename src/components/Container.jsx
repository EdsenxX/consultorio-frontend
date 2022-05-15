const Container = (props) => {
  return (
    <div className="bg-sky-800 h-screen flex justify-center items-center">
      <div className="bg-white rounded-xl p-7 w-[90%] h-[90%] flex gap-5 shadow-2xl overflow-y-auto">
        {props.children}
      </div>
    </div>
  );
};

export default Container;
