const Button = (props) => {
  return (
    <button
      className="w-auto mt-4 p-3 bg-sky-800 text-white rounded-lg shadow-lg shadow-sky-800/60 flex items-center gap-2"
      onClick={props.onClick}
      type={props.type}
    >
      {props.children}
    </button>
  );
};

export default Button;
