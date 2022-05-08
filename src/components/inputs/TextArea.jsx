// Dependencies
import { useId } from "react";

const TextArea = (props) => {
  const textAreaId = useId();
  return (
    <div className="flex flex-col mb-5 w-full">
      <label htmlFor={textAreaId} className="text-2xl">
        {props.label}
        {props.required && (<span className="text-red-500 text-xl ml-2">*</span>)}
      </label>
      <textarea
        {...props.register}
        type={props.type}
        id={textAreaId}
        className="outline-none border-b-2 border-sky-800 w-full resize-none"
        disabled={props.disabled}
        value={props.value}
      />
      {props.error && (
        <p className="text-sm text-red-500 p-1">{props.error.message}</p>
      )}
    </div>
  );
};

export default TextArea;
