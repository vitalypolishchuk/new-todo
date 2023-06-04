import styles from "./Input.module.scss";
import { useSelector } from "react-redux";
import { storeType } from "../../store/storeTypes";

type PropsType = {
  type: string;
  placeholder?: string;
  description: string;
  isBgRed?: boolean | null;
  value: string;
  height: string;
  width: string;
  maxWidth?: string;
  fontSize?: string;
  margin?: string;
  setValue: (value: string) => void;
};

const Input = ({ type, placeholder, description, isBgRed, value, height, width, maxWidth, fontSize, margin, setValue }: PropsType) => {
  const { theme } = useSelector((state: storeType) => {
    return state;
  });

  return (
    <div style={{ width, maxWidth }}>
      <label htmlFor={description} className={`${styles.input__label} ${theme === "dark" && "dark-text-clr-2"}`}>
        {description}
      </label>
      <input
        type={type}
        style={{ height, fontSize, margin }}
        autoComplete="off"
        className={`${styles.input__value} ${isBgRed === false && "bg-red"} ${theme === "dark" && "dark-text-clr dark-bg-2"}`}
        id={description}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
