import styles from "./RightSideBar.module.scss";
import { useEffect } from "react";
import { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { taskType } from "../../../store/storeTypes";
import { storeType } from "../../../store/storeTypes";
import { addTheme, showProfiles, showRightMenu } from "../../../store/actions";
import TasksBar from "../../TasksBar/TasksBar";
import { currentDay } from "../../../utils/utils";
import DeleteData from "../../DeleteData/DeleteData";
import Overlay from "../../Overlay/Overlay";

const RightSideBar = () => {
  const dispatch = useDispatch();
  const { theme, currentProfile, currentTasks, showComponents } = useSelector((state: storeType) => {
    return state;
  });

  const [isDeleteData, setIsDeleteData] = useState(false);

  useEffect(() => {
    const handler = () => {
      if (window.screen.width > 1200 && showComponents.isShowRightMenu) {
        dispatch(showRightMenu(false));
      }
    };

    window.addEventListener("resize", handler);

    return () => {
      window.removeEventListener("resize", handler);
    };
  }, [showComponents.isShowRightMenu]);

  const completedTasks = useMemo(() => {
    return currentTasks.filter(({ info }: taskType) => {
      return info.isCompleted;
    });
  }, [currentTasks]);

  const todayTasksAll = useMemo(() => {
    const curtDay = currentDay();
    return currentTasks.filter(({ info }: taskType) => {
      return info.date === curtDay;
    });
  }, [currentTasks]);

  const todayTasksCompleted = useMemo(() => {
    const curtDay = currentDay();
    return currentTasks.filter(({ info }: taskType) => {
      return info.date === curtDay && info.isCompleted;
    });
  }, [currentTasks]);

  const toggleDarkMode = () => {
    if (theme === "dark") {
      dispatch(addTheme("light"));
    } else {
      dispatch(addTheme("dark"));
    }
  };
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleProfiles = () => {
    dispatch(showProfiles(true));
  };

  return (
    <>
      <section className={`${styles.sidebar} ${showComponents.isShowRightMenu && styles.sidebar__showSidebar} ${theme === "dark" && "dark-bg-2"}`}>
        <div className={styles.sidebar__userInfo}>
          <p className={`${styles.sidebar__userName} ${theme === "dark" && "dark-text-clr-2"}`}>{currentProfile.userName}</p>
          <img className={styles.sidebar__userImg} src={currentProfile.userImg} />
        </div>
        <div className={styles.sidebar__profiles}>
          <button className={styles.sidebar__profilesBtn} onClick={handleProfiles}>
            Show Profiles
          </button>
        </div>
        <div className={styles.sidebar__darkMode}>
          <p className={`${styles.sidebar__darkModeText} ${theme === "dark" && "dark-text-clr"}`}>DarkMode</p>
          <button onClick={toggleDarkMode} className={`${styles.sidebar__darkModeBtn} ${theme === "dark" && "dark-bg-3"}`}>
            <span className={`${styles.sidebar__darkModeBtnFill} ${theme === "dark" && styles.sidebar__darkModeBtnClicked}`}></span>
          </button>
        </div>
        {!!todayTasksAll.length && <TasksBar selectedTasks={todayTasksCompleted.length} allTasks={todayTasksAll.length} name="Today's tasks" />}
        <TasksBar selectedTasks={completedTasks.length} allTasks={currentTasks.length} name="All tasks" />
        <div className={styles.sidebar__line}></div>
        <p className={`${styles.sidebar__todayTasksText} ${theme === "dark" && "dark-text-clr-2"}`}>Today's Tasks</p>
        <ul className={`${styles.sidebar__todayTasks} ${theme === "dark" && "dark-text-clr"}`}>
          {todayTasksAll.map((task: taskType) => {
            return (
              <li key={task.info.taskId} className={styles.sidebar__todayTask}>
                {task.info.title}
              </li>
            );
          })}
        </ul>
        <div className={styles.sidebar__delete}>
          <button
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => setIsDeleteData(true)}
            className={`${styles.sidebar__deleteBtn} ${
              isHovered ? (theme === "dark" ? "dark-text-clr" : "clr-selected") : theme === "dark" ? "dark-text-clr-2" : "text-clr"
            }`}
          >
            Delete all data
          </button>
        </div>
        {isDeleteData && <DeleteData setIsDeleteData={setIsDeleteData} />}
      </section>
      {showComponents.isShowRightMenu && <Overlay isShowComponent={showRightMenu} />}
    </>
  );
};

export default RightSideBar;
