import styles from "./Match.module.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import { storeType, taskType } from "../../../../store/storeTypes";

type propsType = {
  task: taskType;
};

const Match = ({ task }: propsType) => {
  const [isHovered, setIsHovered] = useState(false);
  const theme = useSelector(({ theme }: storeType) => {
    return theme;
  });

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <li
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${styles.match} ${theme === "dark" && !isHovered && "dark-text-clr-2"} ${
        isHovered && (theme === "dark" ? "dark-text-clr" : "clr-selected")
      }`}
      key={task.info.taskId}
    >
      <span className={styles.match__name}>{task.info.title}</span>
      <span className={styles.match__date}>{task.info.date}</span>
    </li>
  );
};

export default Match;
