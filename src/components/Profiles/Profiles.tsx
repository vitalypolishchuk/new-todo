import styles from "./Profiles.module.scss";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { directoriesType, profileType, storeType, profileAndDirsType } from "../../store/storeTypes";
import Overlay from "../Overlay/Overlay";
import { addCurrentProfile, showCreateProfile, showProfiles, setCurrentDirectories, setCurrentTasks } from "../../store/actions";
import SingleProfile from "./SingleProfile/SingleProfile";
import AddProfile from "./AddProfile/AddProfile";
import { taskType } from "../../store/storeTypes";

const Profiles = () => {
  const dispatch = useDispatch();
  const { theme, profiles, directories, tasks } = useSelector((state: storeType) => {
    return state;
  });

  const profilesAndDirs = useMemo(() => {
    if (!profiles.length) return null;

    return profiles.map((profile: profileType) => {
      const profileDirs = directories.find((dir: directoriesType) => {
        return profile.userId === dir.userId;
      }) ?? { directories: [] };

      const profileTasks = tasks.filter((task: taskType) => {
        return profile.userId === task.userId;
      });

      return { ...profile, directories: profileDirs.directories, tasks: profileTasks };
    });
  }, [profiles, directories, tasks]);

  const handleLoadProfile = ({ userName, userId, userDate, userImg, directories, tasks }: profileAndDirsType) => {
    dispatch(addCurrentProfile({ userName, userId, userDate, userImg }));
    dispatch(setCurrentDirectories({ userId, directories }));
    dispatch(setCurrentTasks(tasks));
    dispatch(showProfiles(false));
  };

  const handleAddProfile = () => {
    dispatch(showProfiles(false));
    dispatch(showCreateProfile(true));
  };

  return (
    <>
      <div className={`${styles.profiles} ${theme === "dark" && "dark-bg"}`}>
        <div className={styles.profiles__inner}>
          {profilesAndDirs &&
            profilesAndDirs.map((profile) => <SingleProfile {...profile} key={profile.userId} handleLoadProfile={handleLoadProfile} />)}
          <AddProfile handleAddProfile={handleAddProfile} />
        </div>
      </div>
      <Overlay />
    </>
  );
};

export default Profiles;
