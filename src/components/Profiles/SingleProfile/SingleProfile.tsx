import styles from "./SingleProfile.module.scss";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { storeType, taskType } from "../../../store/storeTypes";
import { profileType, profileAndDirsType } from "../../../store/storeTypes";

type propsType = profileType & {
  directories: string[];
  tasks: taskType[];
  handleLoadProfile: ({ userName, userId, userDate, userImg, directories, tasks }: profileAndDirsType) => void;
};

const SingleProfile = ({ userName, userId, userDate, userImg, directories, handleLoadProfile, tasks }: propsType) => {
  const theme = useSelector(({ theme }: storeType) => {
    return theme;
  });

  return (
    <div
      className={`${styles.profile} ${theme === "dark" && "dark-bg-2"}`}
      onClick={() => handleLoadProfile({ userName, userId, userDate, userImg, directories, tasks })}
      key={userId}
    >
      <div className={styles.profile__imgContainer}>
        <img className={styles.profile__img} src={userImg} />
      </div>
      <p className={`${styles.profile__name} ${theme === "dark" && "dark-text-clr"}`}>{userName}</p>
      <div className={styles.profile__date}>
        <span className={`${styles.profile__dateIcon} ${theme === "dark" && "dark-text-clr-2"}`}>
          <FontAwesomeIcon icon={faCalendarDays} />
        </span>
        <span className={`${styles.profile__dateNum} ${theme === "dark" && "dark-text-clr-2"}`}>{userDate}</span>
        <div className={styles.profile__separator}></div>
      </div>
    </div>
  );
};

export default SingleProfile;
