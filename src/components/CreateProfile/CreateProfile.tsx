import styles from "./CreateProfile.module.scss";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import todoImg from "../../images/todo.png";
import CloseButton from "../Buttons/CloseButton/CloseButton";
import Button from "../Buttons/Button/Button";
import { dirType, directoriesType, profileType, storeType } from "../../store/storeTypes";
import Input from "../Input/Input";
import { addDirectory, addProfile, showCreateProfile, showProfiles } from "../../store/actions";
import Overlay from "../Overlay/Overlay";
import { checkURL, currentDay } from "../../utils/utils";

const Name = () => {
  const dispatch = useDispatch();
  const { showComponents, currentProfile, theme, directories } = useSelector((state: storeType) => state);

  const [userName, setUserName] = useState("");
  const [isValidUserName, setIsValidUserName] = useState<null | boolean>(null);
  const [userImg, setUserImg] = useState("");
  const [isValidImg, setIsValidImg] = useState<null | boolean>(true);

  const createProfile = () => {
    const userDate = currentDay();

    let newUserImg = userImg;
    if (!newUserImg) {
      newUserImg = "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png";
    }

    const userId = new Date().getTime().toString();
    const userProfile: profileType = {
      userId,
      userName,
      userImg: newUserImg,
      userDate,
    };
    dispatch(addProfile(userProfile));

    const mainDirectory: dirType = {
      userId,
      directory: "Main",
    };

    dispatch(addDirectory(mainDirectory));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validURL = await checkURL(userImg);

    if (!userName || (userImg && validURL)) {
      if (!userName) setIsValidUserName(false);
      if (userImg && validURL) setIsValidImg(false);

      return;
    }

    setIsValidImg(true);
    setIsValidUserName(true);

    createProfile();
    dispatch(showCreateProfile(false));
    dispatch(showProfiles(true));
  };

  const handleCLose = () => {
    dispatch(showCreateProfile(false));
    if (!currentProfile.userName) {
      dispatch(showProfiles(true));
    }
  };

  useEffect(() => {
    if (userName && !isValidUserName) {
      setIsValidUserName(null);
      return;
    }
  }, [userName]);

  useEffect(() => {
    if (!userImg) {
      setIsValidImg(null);
      return;
    }
  }, [userImg]);

  return (
    <>
      <div className={`${styles.name} ${theme === "dark" && "dark-bg"}`}>
        <form className={styles.name__form} onSubmit={handleSubmit}>
          <img className={styles.name__todoImg} src={todoImg} alt="todoImg" />
          <button className={styles.name__closeBtn} onClick={handleCLose}>
            <CloseButton size="md" />
          </button>
          <Input
            type="text"
            description="Name"
            isBgRed={isValidUserName}
            value={userName}
            setValue={setUserName}
            height="45px"
            width="90%"
            maxWidth="280px"
            margin="0 0 2rem 0"
          />
          <Input
            type="text"
            description="Image URL"
            isBgRed={isValidImg}
            value={userImg}
            setValue={setUserImg}
            height="45px"
            width="90%"
            maxWidth="280px"
            margin="0 0 4rem 0"
          />
          <Button color="active" size="md" type="submit" text="SUBMIT" />
        </form>
      </div>
      <Overlay isShowComponent={showCreateProfile} />
    </>
  );
};

export default Name;
