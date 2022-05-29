// Dependencies
import { useId } from "react";

const Input = (props) => {
  const inputId = useId();
  return (
    <div className="flex flex-col mb-5 w-full">
      <label htmlFor={inputId} className="text-2xl">
        {props.label}
        {props.required && (<span className="text-red-500 text-xl ml-2">*</span>)}
      </label>
      <input
        {...props.register}
        type={props.type}
        id={inputId}
        className="outline-none border-b-2 border-sky-800 w-full bg-transparent"
        disabled={props.disabled}
        value={props.value}
      />
      {props.error && (
        <p className="text-sm text-red-500 p-1">{props.error.message}</p>
      )}
    </div>
  );
};

export default Input;
