import styles from "./SearchInput.module.scss";
import { useSelector } from "react-redux";
import { storeType } from "../../store/storeTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

type propsType = {
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
  width?: string;
};

const SearchInput = ({ searchValue, setSearchValue, width }: propsType) => {
  const theme = useSelector(({ theme }: storeType) => {
    return theme;
  });

  return (
    <div className={`${styles.navigation__search} ${theme === "dark" && "dark-bg-2"}`} style={{ width }}>
      <input
        className={`${styles.navigation__searchInput} ${theme === "dark" && "dark-text-clr"}`}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search Task"
      />
      <FontAwesomeIcon className={styles.navigation__searchIcon} icon={faMagnifyingGlass} />
    </div>
  );
};

export default SearchInput;
