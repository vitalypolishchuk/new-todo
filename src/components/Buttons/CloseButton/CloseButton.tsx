import styles from "./CloseButton.module.scss";
import { useSelector } from "react-redux";
import { storeType } from "../../../store/storeTypes";

const sizes: { [key: string]: { height: string; width: string } } = {
  sm: {
    height: "1px",
    width: "17px",
  },
  md: {
    height: "1.5px",
    width: "22px",
  },
  lg: {
    height: "2px",
    width: "25px",
  },
  xl: {
    height: "2px",
    width: "40px",
  },
};

const CloseButton = ({ size }: { size: string }) => {
  const { theme } = useSelector((state: storeType) => {
    return state;
  });

  return <span className={`${styles.close__button} ${theme === "dark" && "bg"}`} style={sizes[size]}></span>;
};

export default CloseButton;
