import styles from "./Button.module.scss";
import { useState } from "react";

const sizes: { [key: string]: { fontSize: string; padding: string } } = {
  sm: {
    fontSize: "1rem",
    padding: "0.8rem 1.8rem",
  },
  md: {
    fontSize: "1.5rem",
    padding: "1rem 3rem",
  },
  lg: {
    fontSize: "2rem",
    padding: "1rem 5rem",
  },
};

type PropsType = {
  size: string;
  color: "active" | "passive";
  type?: "submit";
  text: string;
  margin?: string;
  width?: string;
  height?: string;
  handleClick?: () => void;
};

const Button = ({ color, size, type, text, margin, width, height, handleClick }: PropsType) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`${styles.btn} ${
        color === "active" ? (isHovered ? styles.btn__activeHover : styles.btn__active) : isHovered ? styles.btn__passiveHover : styles.btn__passive
      }`}
      type={type}
      style={{ ...sizes[size], margin, width, height }}
    >
      {text}
    </button>
  );
};

export default Button;
