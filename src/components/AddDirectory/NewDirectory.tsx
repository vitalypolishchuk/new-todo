import styles from "./NewDirectory.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeType } from "../../store/storeTypes";
import Input from "../Input/Input";
import Button from "../Buttons/Button/Button";
import CloseButton from "../Buttons/CloseButton/CloseButton";
import Overlay from "../Overlay/Overlay";
import { addCurrentDirectory, addDirectory, showNewDirectory } from "../../store/actions";

type propsType = {
  isShow: boolean;
  setIsShow: (isShow: boolean) => void;
};

const AddDirectory = ({ isShow, setIsShow }: propsType) => {
  const [title, setTitle] = useState("");
  const [isValidTitle, setIsValidTitle] = useState<null | boolean>(null);
  const [isTitleExist, setIsTitleExist] = useState(false);

  const dispatch = useDispatch();
  const { theme, currentProfile, currentDirectories } = useSelector((state: storeType) => {
    return state;
  });

  const handleCLose = () => {
    setTitle("");
    setIsShow(false);
  };

  useEffect(() => {
    if (title && !isValidTitle) {
      setIsValidTitle(null);
    }
    const titleExists = currentDirectories.directories.find((dirTitle: string) => dirTitle.toLocaleLowerCase() === title.toLocaleLowerCase());
    if (titleExists) {
      setIsTitleExist(true);
    } else if (!titleExists && isTitleExist) {
      setIsTitleExist(false);
    }
  }, [title]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title) setIsValidTitle(false);
    if (isTitleExist) return;

    dispatch(addCurrentDirectory(title));
    dispatch(addDirectory({ userId: currentProfile.userId, directory: title }));
    setTitle("");
    setIsValidTitle(null);
    setIsShow(false);
  };

  return (
    <>
      {isShow && (
        <>
          <div className={`${styles.directory} ${theme === "dark" && "dark-bg"}`}>
            <form className={styles.directory__form} onSubmit={onSubmit}>
              <h2 className={`${styles.directory__header} ${theme === "dark" && "dark-text-clr"}`}>Create new directory</h2>
              <button type="button" className={styles.directory__closeBtn} onClick={handleCLose}>
                <CloseButton size="md" />
              </button>
              <div className={styles.directory__inputContainer}>
                <Input
                  type="text"
                  description="Title"
                  isBgRed={isValidTitle}
                  value={title}
                  setValue={setTitle}
                  height="45px"
                  width="100%"
                  margin="0 0 0 0"
                />
                {isTitleExist && <p className={styles.directory__exists}>Directory name already exists</p>}
              </div>
              <div className={styles.directory__buttonContainer}>
                <Button color="active" size="sm" type="submit" text="SUBMIT" />
              </div>
            </form>
          </div>
          <Overlay setIsShowComponent={setIsShow} zIndex={1000} />
        </>
      )}
    </>
  );
};

export default AddDirectory;
