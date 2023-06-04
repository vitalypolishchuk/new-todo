import styles from "./AddProfile.module.scss";
import { useSelector } from "react-redux";

type propsType = {
  handleAddProfile: () => void;
};

const AddProfile = ({ handleAddProfile }: propsType) => {
  const theme = useSelector(({ theme }: { theme: string }) => {
    return theme;
  });

  return (
    <button className={`${styles.profile} ${theme === "dark" && "dark-bg"}`} onClick={() => handleAddProfile()}>
      <h2 className={`${styles.profile__add} ${theme === "dark" && "dark-text-clr"}`}>Add new profile</h2>
    </button>
  );
};

export default AddProfile;
