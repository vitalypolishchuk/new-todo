import styles from "./Select.module.scss";
import { useSelector } from "react-redux";
import { storeType } from "../../store/storeTypes";

type propsType = {
  description: string;
  value: string;
  height: string;
  width: string;
  maxWidth?: string;
  fontSize?: string;
  margin?: string;
  setValue: (value: string) => void;
  options: string[];
};

const Select = ({ description, value, height, width, maxWidth, fontSize, margin, setValue, options }: propsType) => {
  const { theme } = useSelector((state: storeType) => {
    return state;
  });

  return (
    <div style={{ width, maxWidth, margin }}>
      <label htmlFor={description} className={`${styles.select__label} ${theme === "dark" && "dark-text-clr-2"}`}>
        {description}
      </label>
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ height, width }}
        className={`${styles.select__container} ${theme === "dark" && "dark-text-clr dark-bg-2"}`}
        name={description}
        id={description}
      >
        {options.map((name: string) => {
          return (
            <option key={name} value={name.toLowerCase()}>
              {name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
