import styles from "./DirectoriesList.module.scss";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { storeType } from "../../../../store/storeTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteCurrentDirectory, deleteDirectory } from "../../../../store/actions";
import EditDirectory from "../../../EditDirectory/EditDirectory";

type propsType = {
  name: string;
};

const ListElement = ({ name }: propsType) => {
  const location = useLocation();
  const path = location.pathname.slice(1).replace(/%20/g, " ");
  const dispatch = useDispatch();
  const { theme, currentProfile } = useSelector((state: storeType) => {
    return state;
  });

  const [isHovered, setIsHovered] = useState(false);
  const [isShowEdit, setisShowEdit] = useState(false);

  const handleMouseEnter = () => {
    if (name === "Main") return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleEdit = () => {
    setisShowEdit(true);
  };

  const handleDelete = () => {
    dispatch(deleteCurrentDirectory(name));
    dispatch(deleteDirectory({ userId: currentProfile.userId, directory: name }));
  };

  return (
    <>
      <li
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`${styles.element} ${theme === "dark" && !isHovered && "dark-text-clr-2"} ${
          path === `dir/${name}` ? (theme === "dark" ? styles.element__currentPageDark : styles.element__currentPage) : ""
        } ${isHovered && (theme === "dark" ? "dark-text-clr" : "clr-selected")}`}
        key={name}
      >
        <Link className={styles.element__link} to={`dir/${name}`}>
          {name}
        </Link>
        {isHovered && (
          <span className={styles.element__btns}>
            <FontAwesomeIcon onClick={handleEdit} className={styles.element__edit} icon={faPenToSquare} />
            <FontAwesomeIcon onClick={handleDelete} className={styles.element__delete} icon={faTrash} />
          </span>
        )}
      </li>
      {isShowEdit && <EditDirectory prevTitle={name} setIsShowEdit={setisShowEdit} />}
    </>
  );
};

export default ListElement;
