import styles from "./Radio.module.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import { storeType } from "../../store/storeTypes";

type propsType = {
  msg: string;
  margin?: string;
  fontSize?: string;
  value: boolean;
  setValue: (value: boolean) => void;
};

const Radio = ({ msg, margin, fontSize, value, setValue }: propsType) => {
  const { theme } = useSelector((state: storeType) => {
    return state;
  });

  return (
    <div className={styles.radio} style={{ margin }}>
      <button
        type="button"
        className={`${styles.radio__container} ${theme === "dark" && "dark-bg-2 dark-border-1px-solid"}`}
        onClick={() => {
          setValue(!value);
        }}
      >
        {value && <span className={styles.radio__selected}></span>}
      </button>
      <p style={{ fontSize }} className={`${styles.radio__text}  ${theme === "dark" && "dark-text-clr-2"}`}>
        {msg}
      </p>
    </div>
  );
};

export default Radio;
