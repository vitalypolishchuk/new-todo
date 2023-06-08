import styles from "./Tasks.module.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { storeType, taskType } from "../../store/storeTypes";
import { useMemo, useState } from "react";
import { sortByEarierFirst, currentDay, sortByOrderAdded, sortByLaterFirst, sortByCompletedFirst, sortByUncompletedFirst } from "../../utils/utils";
import Navigation from "./Navigation/Navigation";
import { ReactSVG } from "react-svg";
import Select from "../Select/Select";
import { directories, sortByArr } from "../../data";
import SingleTaskLong from "./SingleTask/SingleTaskLong";
import SingleTaskShort from "./SingleTask/SingleTaskShort";
import { addTask, deleteCurrentTask, deleteTask, editCurrentTask, editTask, showNewTask } from "../../store/actions";
import NewTask from "../NewTask/NewTask";

const Tasks = () => {
  const { urlId } = useParams();
  const { currentTasks, theme, currentDirectories } = useSelector((store: storeType) => {
    return store;
  });
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState(sortByArr[0]);
  const [isTasksShort, setIsTasksShort] = useState(false);
  const [taskForEdit, setTaskForEdit] = useState<any>({});

  const tasksArr = useMemo(() => {
    switch (urlId) {
      case "Today's Tasks":
        const curDay = currentDay();
        return currentTasks.filter(({ info }: taskType) => {
          return info.date === curDay;
        });
      case "Important tasks":
        return currentTasks.filter(({ info }: taskType) => {
          return info.isImportant;
        });
      case "Completed tasks":
        return currentTasks.filter(({ info }: taskType) => {
          return info.isCompleted;
        });
      case "Uncompleted tasks":
        return currentTasks.filter(({ info }: taskType) => {
          return !info.isCompleted;
        });
      case undefined:
        return currentTasks;
      default:
        const dir = currentDirectories.directories.find((dirName: string) => dirName === urlId);
        if (dir) {
          return currentTasks.filter(({ info }: taskType) => {
            return info.directory === urlId;
          });
        }
        return [];
    }
  }, [currentTasks, urlId]);

  const sortedTasks = useMemo(() => {
    switch (sortBy.toLocaleLowerCase()) {
      case "order added":
        return sortByOrderAdded(tasksArr);
      case "earlier first":
        return [...tasksArr].sort(sortByEarierFirst);
      case "later first":
        return [...tasksArr].sort(sortByLaterFirst);
      case "completed first":
        return sortByCompletedFirst(tasksArr);
      case "uncompleted first":
        return sortByUncompletedFirst(tasksArr);
      default:
        return [];
    }
  }, [tasksArr, sortBy]);

  const handleComplete = (task: taskType) => {
    const modifiedTask = structuredClone(task);
    modifiedTask.info.isCompleted = !modifiedTask.info.isCompleted;
    dispatch(editCurrentTask(modifiedTask));
    dispatch(editTask(modifiedTask));
  };

  const handleImportant = (task: taskType) => {
    const modifiedTask = structuredClone(task);
    modifiedTask.info.isImportant = !modifiedTask.info.isImportant;
    dispatch(editCurrentTask(modifiedTask));
    dispatch(editTask(modifiedTask));
  };

  const handleDelete = (task: taskType) => {
    dispatch(deleteCurrentTask({ userId: task.userId, taskId: task.info.taskId }));
    dispatch(deleteTask({ userId: task.userId, taskId: task.info.taskId }));
  };

  const handleAddTask = () => {
    dispatch(showNewTask(true));
  };

  return (
    <>
      <div className={`${styles.container} ${theme === "dark" && "dark-bg"}`}>
        <Navigation />
        <h2 className={`${styles.tasks__number} ${theme === "dark" && "dark-text-clr-2"}`}>
          All tasks ({tasksArr.length} {tasksArr.length === 1 ? "task" : "tasks"})
        </h2>
        <div className={styles.tasks__iconsAndSort}>
          <span className={styles.tasks__icons}>
            <svg
              onClick={() => setIsTasksShort(false)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`${styles.tasks__longTasksIcon} ${
                theme === "dark" ? (isTasksShort ? "dark-text-clr-2" : "txt-third") : isTasksShort ? "" : "txt-third"
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              ></path>
            </svg>
            <svg
              onClick={() => setIsTasksShort(true)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="{1.5}"
              stroke="currentColor"
              className={`${styles.tasks__longTasksIcon} ${
                theme === "dark" ? (isTasksShort ? "txt-third" : "dark-text-clr-2") : isTasksShort ? "txt-third" : ""
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
              ></path>
            </svg>
          </span>
          <Select description="Sort By" value={sortBy} setValue={setSortBy} height="50px" width="175px" margin="0 0 2rem 0" options={sortByArr} />
        </div>
        <ul className={`${styles.tasks__container} ${isTasksShort ? styles.tasks__containerShort : styles.tasks__containerLong} `}>
          {sortedTasks.map((task: taskType) => {
            if (!isTasksShort) {
              return (
                <SingleTaskLong
                  task={task}
                  key={task.info.taskId}
                  handleComplete={handleComplete}
                  handleImportant={handleImportant}
                  handleDelete={handleDelete}
                  setTaskForEdit={setTaskForEdit}
                />
              );
            }
            return (
              <SingleTaskShort
                task={task}
                key={task.info.taskId}
                handleComplete={handleComplete}
                handleImportant={handleImportant}
                handleDelete={handleDelete}
                setTaskForEdit={setTaskForEdit}
              />
            );
          })}
          <button
            onClick={handleAddTask}
            className={`${styles.tasks__addTask} ${isTasksShort ? styles.tasks__addShortTask : styles.tasks__addLongTask} ${
              theme === "dark" && "dark-text-clr dark-bg"
            }`}
          >
            Add Task
          </button>
        </ul>
      </div>
      {taskForEdit?.info && <NewTask task={taskForEdit} setEditTask={setTaskForEdit} />}
    </>
  );
};

export default Tasks;
