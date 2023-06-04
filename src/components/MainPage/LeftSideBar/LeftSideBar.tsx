import styles from "./LeftSideBar.module.scss";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { storeType } from "../../../store/storeTypes";
import { showNewTask, showNewDirectory, showLeftMenu } from "../../../store/actions";
import { tasks } from "../../../data";
import ListElement from "./ListElement/ListElement";
import DirectoriesList from "./DirectoriesList/DirectoriesList";
import Overlay from "../../Overlay/Overlay";
import NewDirectory from "../../AddDirectory/NewDirectory";

const LeftSideBar = () => {
  const [isShowDirectories, setIsShowDirectories] = useState(false);
  const [isShowNewDirectory, setIsShowNewDirectory] = useState(false);
  const dispatch = useDispatch();
  const { theme, currentDirectories, showComponents } = useSelector((state: storeType) => {
    return state;
  });

  useEffect(() => {
    const handler = () => {
      if (window.screen.width > 1200 && showComponents.isShowLeftMenu) {
        dispatch(showLeftMenu(false));
      }
    };

    window.addEventListener("resize", handler);

    return () => {
      window.removeEventListener("resize", handler);
    };
  }, [showComponents.isShowLeftMenu]);

  const handleAddDirectory = () => {
    setIsShowNewDirectory(true);
  };

  const handleAddTask = () => {
    dispatch(showNewTask(true));
  };

  return (
    <>
      <section className={`${styles.sidebar} ${showComponents.isShowLeftMenu && styles.sidebar__showSidebar} ${theme === "dark" && "dark-bg-2"}`}>
        <h3 className={`${styles.sidebar__header} ${theme === "dark" && "dark-text-clr-2"}`}>TO-DO LIST</h3>
        <div className={styles.sidebar__addTask}>
          <button className={styles.sidebar__addTaskBtn} onClick={handleAddTask}>
            Add new task
          </button>
        </div>
        <ul className={styles.sidebar__tasks}>
          {tasks.map(({ name, path }) => {
            return <ListElement name={name} key={name} path={path} />;
          })}
        </ul>
        <div className={styles.directories}>
          <div
            className={styles.directories__textContainer}
            onClick={() => {
              setIsShowDirectories((prev) => !prev);
            }}
          >
            <svg
              className={`${styles.directories__svg} ${theme === "dark" && "dark-text-clr"} ${isShowDirectories && styles.directories__svgOpen}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              fill="currentColor"
            >
              <path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"></path>
            </svg>
            <span className={`${styles.directories__text} ${theme === "dark" && "dark-text-clr"}`}>Directories</span>
          </div>
          {isShowDirectories && (
            <>
              <ul className={styles.directories__values}>
                {currentDirectories.directories.map((name: string) => {
                  return <DirectoriesList name={name} key={name} />;
                })}
              </ul>
              <div className={styles.directories__addDirectory}>
                <button
                  className={`${styles.directories__addDirectoryBtn} ${theme === "dark" && "dark-text-clr-2 dark-border"}`}
                  onClick={handleAddDirectory}
                >
                  + New
                </button>
              </div>
            </>
          )}
        </div>
      </section>
      <NewDirectory isShow={isShowNewDirectory} setIsShow={setIsShowNewDirectory} />
      {showComponents.isShowLeftMenu && <Overlay isShowComponent={showLeftMenu} />}
    </>
  );
};

export default LeftSideBar;
