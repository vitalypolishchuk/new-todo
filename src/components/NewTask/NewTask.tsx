import styles from "./NewTask.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeType, taskType } from "../../store/storeTypes";
import { showNewTask, addTask, addCurrentTask, editCurrentTask, editTask } from "../../store/actions";
import Overlay from "../Overlay/Overlay";
import CloseButton from "../Buttons/CloseButton/CloseButton";
import Input from "../Input/Input";
import TextArea from "../TextArea/TextArea";
import Select from "../Select/Select";
import Radio from "../Radio/Radio";
import Button from "../Buttons/Button/Button";
import { convertDate, convertDateToOrigin } from "../../utils/utils";

type propsType = {
  task?: taskType;
  setEditTask?: any;
};

const NewTask = ({ task, setEditTask }: propsType) => {
  const [title, setTitle] = useState(task?.info?.title ?? "");
  const [isValidTitle, setIsValidTitle] = useState<null | boolean>(null);
  const [date, setDate] = useState(task?.info?.date ? convertDateToOrigin(task.info.date) : "");
  const [isValidDate, setIsValidDate] = useState<null | boolean>(null);
  const [description, setDescription] = useState(task?.info?.description ?? "");
  const [isImportant, setIsImportant] = useState(task?.info?.isImportant ?? false);
  const [isCompleted, setIsCompleted] = useState(task?.info?.isCompleted ?? false);
  const [directory, setDirectory] = useState(task?.info?.directory ?? "");

  const dispatch = useDispatch();
  const { theme, currentDirectories, currentProfile } = useSelector((state: storeType) => {
    return state;
  });

  useEffect(() => {
    if (currentDirectories && currentDirectories.directories.length > 0) {
      setDirectory(currentDirectories.directories[0]);
    }
  }, [currentDirectories]);

  useEffect(() => {
    if (title && !isValidTitle) {
      setIsValidTitle(true);
    }
  }, [title]);

  useEffect(() => {
    if (date && !isValidDate) {
      setIsValidDate(true);
    }
  }, [date]);

  const handleClose = () => {
    if (setEditTask) {
      setEditTask({});
      return;
    }
    dispatch(showNewTask(false));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // check if fields are filled
    if (!title || !date) {
      if (!title) setIsValidTitle(false);
      if (!date) setIsValidDate(false);
      return;
    }

    const convertedDate = convertDate(date);
    const taskId = new Date().getTime().toString();

    if (setEditTask && task) {
      dispatch(
        editCurrentTask({
          userId: currentProfile.userId,
          info: { taskId: task.info.taskId, title, date: convertedDate, description, directory, isImportant, isCompleted },
        })
      );
      dispatch(
        editTask({
          userId: currentProfile.userId,
          info: { taskId, title, date: convertedDate, description, directory, isImportant, isCompleted },
        })
      );
      setEditTask({});
      return;
    }

    dispatch(
      addCurrentTask({
        userId: currentProfile.userId,
        info: { taskId, title, date: convertedDate, description, directory, isImportant, isCompleted },
      })
    );
    dispatch(
      addTask({ userId: currentProfile.userId, info: { taskId, title, date: convertedDate, description, directory, isImportant, isCompleted } })
    );

    dispatch(showNewTask(false));
  };

  return (
    <>
      <div className={`${styles.task} ${theme === "dark" && "dark-bg"}`}>
        <form className={styles.task__form} onSubmit={onSubmit}>
          <button className={styles.task__closeBtn} type="button" onClick={handleClose}>
            <CloseButton size="md" />
          </button>
          <h2 className={`${styles.task__header} ${theme === "dark" && "dark-text-clr"}`}>Add a task</h2>
          <Input
            type="text"
            description="Title"
            isBgRed={isValidTitle}
            value={title}
            setValue={setTitle}
            height="45px"
            width="100%"
            margin="0 0 1rem 0"
          />
          <Input
            type="date"
            description="Date"
            isBgRed={isValidDate}
            value={date}
            setValue={setDate}
            height="45px"
            width="100%"
            margin="0 0 2rem 0"
          />
          <TextArea
            description="Description (optional)"
            placeholder="e.g., study for the test"
            isBgRed={isValidDate}
            value={description}
            setValue={setDescription}
            height="45px"
            width="100%"
            margin="0 0 2rem 0"
          />
          <Select
            description="Select a directory"
            value={directory}
            setValue={setDirectory}
            height="45px"
            width="100%"
            margin="0 0 2rem 0"
            options={currentDirectories.directories}
          />
          <Radio value={isImportant} setValue={setIsImportant} msg="Mark as important" margin="0 0 1rem 0" />
          <Radio value={isCompleted} setValue={setIsCompleted} msg="Mark as completed" margin="0 0 2rem 0" />
          <Button color="active" size="md" type="submit" text="SUBMIT" width="100%" />
        </form>
      </div>
      <Overlay isShowComponent={showNewTask} />
    </>
  );
};

export default NewTask;
