import "./sass/main.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { storeType } from "./store/storeTypes";
import MainPage from "./components/MainPage/Mainpage";
import { directories, tasks, tasksType } from "./data";
import Tasks from "./components/Tasks/Tasks";
import { directoriesType } from "./store/storeTypes";

function App() {
  const { currentDirectories, currentProfile, currentTasks } = useSelector((state: storeType) => {
    return state;
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route path="/" element={<Tasks />} />
            {currentDirectories.directories.map((directory: string) => {
              return <Route key={directory} path="/dir/:urlId" element={<Tasks />} />;
            })}
            {currentProfile.userId &&
              tasks.map(({ name }: tasksType) => {
                return <Route key={name} path="/:urlId" element={<Tasks />} />;
              })}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
