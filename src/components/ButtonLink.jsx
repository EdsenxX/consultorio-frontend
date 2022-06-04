// Dependencies
import { Link } from "react-router-dom";

const ButtonLink = (props) => {
  const OnlyText = () => {
    return "mt-4 p-3 bg-sky-800 text-white rounded-lg shadow-lg shadow-sky-800/60 hover:scale-105 transition-transform";
  };

  const Normal = () => {
    return "mt-4 p-3 bg-sky-800 text-white rounded-lg shadow-lg shadow-sky-800/60 flex items-center gap-2 hover:scale-105 transition-transform";
  };

  const styles = () => {
    let style = "";
    if (props.onlyText) {
      style = OnlyText();
    } else {
      style = Normal();
    }
    if (props.full) {
      style += " w-full";
    }
    return style;
  };

  return (
    <Link to={props.to} className={styles()}>
      {props.children}
    </Link>
  );
};

export default ButtonLink;
