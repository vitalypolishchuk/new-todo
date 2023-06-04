import styles from "./Navigation.module.scss";
import { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { storeType } from "../../../store/storeTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { showLeftMenu, showNewTask, showRightMenu } from "../../../store/actions";
import { searchStr } from "../../../utils/utils";
import { taskType } from "../../../store/storeTypes";
import SearchInput from "../../SearchInput/SearchInput";
import Button from "../../Buttons/Button/Button";
import Match from "./Match/Match";

const Navigation = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1200);
  const { currentProfile, currentTasks, theme } = useSelector((store: storeType) => {
    return store;
  });
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [matchedTasks, setMatchedTasks] = useState<taskType[]>([]);

  useEffect(() => {
    if (!searchValue) {
      setMatchedTasks([]);
      return;
    }

    const matches = searchStr(searchValue, currentTasks);
    setMatchedTasks(matches);
  }, [searchValue]);

  const toggleLeftMenu = () => {
    dispatch(showLeftMenu(true));
  };

  const toggleRightMenu = () => {
    console.log("here");
    dispatch(showRightMenu(true));
  };

  const curDay = useMemo(() => {
    const currentDate = new Date();
    return currentDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  }, []);

  useEffect(() => {
    const handler = () => {
      if (window.innerWidth < 768 && !isMobile) {
        setIsMobile(true);
      } else if (window.innerWidth >= 768 && isMobile) {
        setIsMobile(false);
      }

      if (window.innerWidth >= 1200 && !isDesktop) {
        setIsDesktop(true);
      } else if (window.innerWidth < 1200 && isDesktop) {
        setIsDesktop(false);
      }
    };

    window.addEventListener("resize", handler);

    return () => {
      window.removeEventListener("resize", handler);
    };
  });

  const handleAddTask = () => {
    dispatch(showNewTask(true));
  };

  return (
    <div className={styles.navigation}>
      <div className={styles.navigation__top}>
        <div className={styles.navigation__menuAndSearch}>
          {!isDesktop && (
            <FontAwesomeIcon
              onClick={toggleLeftMenu}
              className={`${styles.navigation__menu} ${theme === "dark" && "dark-text-clr-2"}`}
              icon={faBars}
            />
          )}
          {!isMobile && <SearchInput width="280px" searchValue={searchValue} setSearchValue={setSearchValue} />}
        </div>
        <div className={styles.navigation__header}>
          <h3 className={`${styles.navigation__headerText} ${theme === "dark" && "dark-text-clr"}`}>TO-DO LIST</h3>
          <p className={`${theme === "dark" && "dark-text-clr-2"}`}>{curDay}</p>
        </div>
        <div className={styles.navigation__profile}>
          <FontAwesomeIcon className={styles.navigation__bell} icon={faBell} />
          {!isMobile && <Button color="active" size="sm" text="Add New Task" width="100%" height="100%" handleClick={handleAddTask} />}
          {!isDesktop && <img onClick={toggleRightMenu} className={styles.navigation__userImg} src={currentProfile.userImg} />}
        </div>
      </div>
      {!!isMobile && <SearchInput searchValue={searchValue} setSearchValue={setSearchValue} />}
      {!!matchedTasks.length && (
        <ul className={`${styles.navigation__matches} ${theme === "dark" && "dark-bg-2"}`}>
          {matchedTasks.map((task: taskType) => {
            return <Match task={task} />;
          })}
          <div className={styles.navigation__resultsBtnContainer}>
            <button className={`${styles.navigation__resultsBtn} ${theme === "dark" && "dark-bg-3 dark-text-clr"}`}>
              All results for "{searchValue}"
            </button>
          </div>
        </ul>
      )}
    </div>
  );
};

export default Navigation;
