import "./Name.scss";
import { useState } from "react";
import todoImg from "../../images/todo.png";
import CloseButton from "../CloseButton/CloseButton";

const Name = () => {
  const [name, setName] = useState("");

  return (
    <>
      <h1>hello</h1>
      <div className="name__container">
        <div className="name__inner-container">
          <img className="name__todo-img" src={todoImg} alt="todoImg" />
          <span className="name__close-button">
            <CloseButton size={"md"} />
          </span>
          <span className="name__input-container">
            <p className="name__label">PROVIDE NAME</p>
            <input className="name__input" type="text" />
          </span>
        </div>
      </div>
      {!name && <div className="overlay"></div>}
    </>
  );
};

export default Name;
