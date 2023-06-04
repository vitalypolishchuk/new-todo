import styles from "./MainPage.module.scss";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { storeType } from "../../store/storeTypes";
import LeftSideBar from "../MainPage/LeftSideBar/LeftSideBar";
import { Outlet } from "react-router-dom";
import Profiles from "../Profiles/Profiles";
import CreateProfile from "../CreateProfile/CreateProfile";
import NewTask from "../NewTask/NewTask";
import NewDirectory from "../AddDirectory/NewDirectory";
import { setProfiles, setDirectories, setTasks } from "../../store/actions";
import RightSideBar from "./RightSideBar/RightSideBar";
import { searchStr } from "../../utils/utils";

const MainPage = () => {
  const dispatch = useDispatch();
  const { profiles, directories, tasks, showComponents, currentTasks } = useSelector((state: storeType) => {
    return state;
  });

  useEffect(() => {
    const profilesStr = localStorage.getItem("profiles");
    const directoriesStr = localStorage.getItem("directories");
    const tasksStr = localStorage.getItem("tasks");
    if (profilesStr) {
      const profiles = JSON.parse(profilesStr);
      dispatch(setProfiles(profiles));
    }
    if (directoriesStr) {
      const directories = JSON.parse(directoriesStr);
      dispatch(setDirectories(directories));
    }
    if (tasksStr) {
      const tasks = JSON.parse(tasksStr);
      dispatch(setTasks(tasks));
    }
  }, []);

  useEffect(() => {
    if (profiles.length === 0) {
      localStorage.removeItem("profiles");
    } else {
      localStorage.setItem("profiles", JSON.stringify(profiles));
    }
  }, [profiles]);

  useEffect(() => {
    if (directories.length === 0) {
      localStorage.removeItem("directories");
    } else {
      localStorage.setItem("directories", JSON.stringify(directories));
    }
  }, [directories]);

  useEffect(() => {
    if (tasks.length === 0) {
      localStorage.removeItem("tasks");
    } else {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  return (
    <>
      {showComponents.isShowProfiles && <Profiles />}
      {showComponents.isShowCreateProfile && <CreateProfile />}
      {showComponents.isShowNewTask && <NewTask />}
      {/* {showComponents.isShowNewDirectory && <NewDirectory />} */}
      <div className={styles.mainPage}>
        <LeftSideBar />
        <Outlet />
        <RightSideBar />
      </div>
    </>
  );
};

export default MainPage;
