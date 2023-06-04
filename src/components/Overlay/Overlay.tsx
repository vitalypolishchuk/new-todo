import styles from "./Overlay.module.scss";
import { useSelector } from "react-redux";
import { storeType } from "../../store/storeTypes";
import { useDispatch } from "react-redux";

type PropsType = {
  isShowComponent?: (isShow: boolean) => { type: string; payload: boolean };
  setIsShowComponent?: (isShow: boolean) => void;
  zIndex?: number;
};

const Overlay = ({ isShowComponent, zIndex, setIsShowComponent }: PropsType) => {
  const theme = useSelector(({ theme }: storeType) => theme);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (setIsShowComponent) {
      setIsShowComponent(false);
      return;
    }

    if (isShowComponent) {
      dispatch(isShowComponent(false));
    }
  };

  return <div onClick={handleClick} className={`${styles.overlay} ${theme === "dark" && "overlay-dark"}`} style={{ zIndex }}></div>;
};

export default Overlay;
