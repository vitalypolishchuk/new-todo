import styles from "./ListElement.module.scss";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { storeType } from "../../../../store/storeTypes";

type propsType = {
  name: string;
  path: string;
};

const ListElement = ({ name, path }: propsType) => {
  const myPath = path === "/" ? "" : path;
  const location = useLocation();
  const curPath = location.pathname.slice(1).replace(/%20/g, " ");
  const theme = useSelector(({ theme }: storeType) => {
    return theme;
  });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <li
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`${styles.element} ${theme === "dark" && !isHovered && "dark-text-clr-2"} ${
          curPath === myPath ? (theme === "dark" ? styles.element__currentPageDark : styles.element__currentPage) : ""
        } ${isHovered && (theme === "dark" ? "dark-text-clr" : "clr-selected")}`}
        key={name}
      >
        <Link className={styles.element__link} to={path}>
          {name}
        </Link>
      </li>
    </>
  );
};

export default ListElement;
