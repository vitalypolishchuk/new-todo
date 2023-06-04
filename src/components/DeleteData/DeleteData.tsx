import styles from "./DeleteData.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storeType } from "../../store/storeTypes";
import CloseButton from "../Buttons/CloseButton/CloseButton";
import Button from "../Buttons/Button/Button";
import Overlay from "../Overlay/Overlay";
import {
  deleteProfiles,
  deleteDirectories,
  deleteTasks,
  deleteCurrentProfiles,
  deleteCurrentDirectories,
  deleteCurrentTasks,
  showProfiles,
} from "../../store/actions";

type propsType = {
  setIsDeleteData: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteData = ({ setIsDeleteData }: propsType) => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: storeType) => {
    return state;
  });
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(deleteProfiles());
    dispatch(deleteDirectories());
    dispatch(deleteTasks());

    dispatch(deleteCurrentProfiles());
    dispatch(deleteCurrentDirectories());
    dispatch(deleteCurrentTasks());
    setIsDeleteData(false);
    navigate("/");
    dispatch(showProfiles(true));
  };

  const handleClose = () => {
    setIsDeleteData(false);
  };

  return (
    <>
      <div className={`${styles.delete} ${theme === "dark" && "dark-bg"}`}>
        <form className={styles.delete__form} onSubmit={onSubmit}>
          <h2 className={`${styles.delete__header} ${theme === "dark" && "dark-text-clr"}`}>Are you sure?</h2>
          <p className={`${styles.delete__text} ${theme === "dark" && "dark-text-clr-2"}`}>All data will be deleted permanently.</p>
          <button type="button" className={styles.delete__closeBtn} onClick={handleClose}>
            <CloseButton size="md" />
          </button>
          <div className={styles.delete__buttonContainer}>
            <div className={styles.delete__buttonContainerInner}>
              <Button color="active" size="sm" type="submit" text="SUBMIT" />
            </div>
            <Button handleClick={handleClose} color="passive" size="sm" text="CANCEL" />
          </div>
        </form>
      </div>
      <Overlay />
    </>
  );
};

export default DeleteData;
