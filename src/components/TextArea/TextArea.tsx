import styles from "./TextArea.module.scss";
import { useSelector } from "react-redux";
import { storeType } from "../../store/storeTypes";

type PropsType = {
  placeholder?: string;
  description: string;
  isBgRed?: boolean | null;
  value: string;
  height: string;
  width: string;
  maxWidth?: string;
  margin?: string;
  setValue: (value: string) => void;
};

const TextArea = ({ placeholder, description, isBgRed, value, height, width, maxWidth, margin, setValue }: PropsType) => {
  const { theme } = useSelector((state: storeType) => {
    return state;
  });

  return (
    <div style={{ width, maxWidth }}>
      <label htmlFor={description} className={`${styles.textArea__label}  ${theme === "dark" && "dark-text-clr-2"}`}>
        {description}
      </label>
      <textarea
        style={{ margin }}
        autoComplete="off"
        className={`${styles.textArea__value}  ${theme === "dark" && "dark-text-clr dark-bg-2"}`}
        id={description}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextArea;
