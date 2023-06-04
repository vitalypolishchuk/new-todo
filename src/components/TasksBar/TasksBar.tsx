import styles from "./TasksBar.module.scss";
import { useSelector } from "react-redux";
import { storeType } from "../../store/storeTypes";

type propsType = {
  selectedTasks: number;
  allTasks: number;
  name: string;
};

const TasksBar = ({ selectedTasks, allTasks, name }: propsType) => {
  const theme = useSelector(({ theme }: storeType) => {
    return theme;
  });

  const calcTaskBarWidth = () => {
    if (!selectedTasks && !allTasks) return "0%";
    return (selectedTasks / allTasks) * 100 + "%";
  };

  return (
    <>
      <div className={`${styles.sidebar__allTasks} ${theme === "dark" && "dark-text-clr"}`}>
        <p className={styles.sidebar__allTasksText}>{name}</p>
        <span>
          {selectedTasks}/{allTasks}
        </span>
      </div>
      <div className={`${styles.sidebar__tasksBar} ${theme === "dark" && "dark-bg-3"}`}>
        <span style={{ width: calcTaskBarWidth() }} className={styles.sidebar__taskBarFilled}></span>
      </div>
    </>
  );
};

export default TasksBar;
