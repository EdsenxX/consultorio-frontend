// Dependencies
import { useId } from "react";

const Select = (props) => {
  const selectId = useId();
  return (
    <div className="flex flex-col mb-5 w-full">
      <label htmlFor={selectId} className="text-2xl">
        {props.label}
        {props.required && <span className="text-red-500 text-xl ml-2">*</span>}
      </label>
      <select
        {...props.register}
        id={selectId}
        className="outline-none border-b-2 border-sky-800 w-full bg-transparent"
      >
        {props.children}
      </select>
      {props.error && (
        <p className="text-sm text-red-500 p-1">{props.error.message}</p>
      )}
    </div>
  );
};

export default Select;
