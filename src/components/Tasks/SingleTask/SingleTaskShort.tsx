import styles from "./SingleTaskShort.module.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storeType } from "../../../store/storeTypes";
import { taskType } from "../../../store/storeTypes";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faTrash, faEllipsisVertical, faCalendarDays } from "@fortawesome/free-solid-svg-icons";

const starIcon: IconDefinition = faStar;

type propsType = {
  task: taskType;
  handleComplete: (task: taskType) => void;
  handleImportant: (task: taskType) => void;
  handleDelete: (task: taskType) => void;
  setTaskForEdit: (task: any) => void;
};

const SingleTask = ({ task, handleComplete, handleImportant, handleDelete, setTaskForEdit }: propsType) => {
  const theme = useSelector(({ theme }: storeType) => {
    return theme;
  });
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/dir/${task.info.directory}`);
  };

  return (
    <div className={`${styles.task} ${theme === "dark" && "dark-bg-2"}`}>
      <button className={styles.task__directory} onClick={handleNavigate}>
        {task.info.directory}
      </button>
      <div className={styles.task__inner}>
        <h4 className={`${styles.task__header} ${theme === "dark" && "dark-text-clr"}`}>{task.info.title}</h4>
        <div className={styles.task__date}>
          <FontAwesomeIcon className={`${styles.task__dateIcon} ${theme === "dark" && "dark-text-clr"}`} icon={faCalendarDays} />
          <span className={`${styles.task__dateNum} ${theme === "dark" && "dark-text-clr"}`}>{task.info.date}</span>
        </div>
        <div className={styles.task__separator}></div>
        <div className={styles.task__info}>
          <span
            onClick={() => handleComplete(task)}
            className={`${styles.task__isCompleted} ${task.info.isCompleted ? styles.task__completed : styles.task__uncompleted}`}
          >
            {task.info.isCompleted ? "Completed" : "Uncompleted"}
          </span>
          <div>
            <FontAwesomeIcon
              onClick={() => handleImportant(task)}
              className={`${styles.task__isImportant} ${theme === "dark" && "dark-text-clr"} ${task.info.isImportant && styles.task__important}`}
              icon={faStar}
            />
            <FontAwesomeIcon
              onClick={() => handleDelete(task)}
              className={`${styles.task__delete} ${theme === "dark" && "dark-text-clr"}`}
              icon={faTrash}
            />
            <FontAwesomeIcon
              onClick={() => setTaskForEdit(task)}
              className={`${styles.task__edit} ${theme === "dark" && "dark-text-clr"}`}
              icon={faEllipsisVertical}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTask;
