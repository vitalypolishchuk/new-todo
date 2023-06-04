import { taskType } from "../store/storeTypes";

export const checkURL = (url: string): Promise<boolean> => {
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.status === 200;
      } else {
        throw new Error("Network response was not OK");
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

export const currentDay = () => {
  const currentDate = new Date();
  const curDay = currentDate.getDate().toString().padStart(2, "0");
  const curMonth = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const curYear = currentDate.getFullYear();
  return `${curDay}/${curMonth}/${curYear}`;
};

export const convertDate = (dateStr: string) => {
  const parts = dateStr.split("-");
  const day = parts[2];
  const month = parts[1];
  const year = parts[0];
  return `${day}/${month}/${year}`;
};

export const convertDateToOrigin = (dateStr: any) => {
  const parts = dateStr.split("/");
  const day = parts[0];
  const month = parts[1];
  const year = parts[2];
  return `${year}-${month}-${day}`;
};

export const searchStr = (str: string, array: taskType[]) => {
  const regex = new RegExp(str, "gi");
  return array.filter(({ info }) => info.title.match(regex));
};

export const sortByOrderAdded = (tasks: taskType[]) => {
  return [...tasks].reverse();
};

export const sortByEarierFirst = (task1: taskType, task2: taskType) => {
  const [day1, month1, year1] = task1.info.date.split("/");
  const [day2, month2, year2] = task2.info.date.split("/");

  // Create date objects using the rearranged format "mm/dd/yyyy"
  const formattedDate1 = new Date(`${month1}/${day1}/${year1}`);
  const formattedDate2 = new Date(`${month2}/${day2}/${year2}`);

  return +formattedDate1 - +formattedDate2;
};

export const sortByLaterFirst = (task1: taskType, task2: taskType) => {
  const [day1, month1, year1] = task1.info.date.split("/");
  const [day2, month2, year2] = task2.info.date.split("/");

  // Create date objects using the rearranged format "mm/dd/yyyy"
  const formattedDate1 = new Date(`${month1}/${day1}/${year1}`);
  const formattedDate2 = new Date(`${month2}/${day2}/${year2}`);

  return +formattedDate2 - +formattedDate1;
};

export const sortByCompletedFirst = (tasks: taskType[]) => {
  const result = [];

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    if (task.info.isCompleted) {
      result.unshift(task);
    } else {
      result.push(task);
    }
  }

  return result;
};

export const sortByUncompletedFirst = (tasks: taskType[]) => {
  const result = [];

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    if (task.info.isCompleted) {
      result.push(task);
    } else {
      result.unshift(task);
    }
  }

  return result;
};
