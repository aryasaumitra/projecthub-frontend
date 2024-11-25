import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProjectList from "./pages/projectList";
import TaskList from "./pages/taskList";
import TaskDetails from "./pages/taskListDetails";
import LoginComponent from "./components/loginSignupComponent/Login";
import RegisterComponent from "./components/loginSignupComponent/Register";
import HeaderComponent from "./components/headerComponent/header";
import HomePageComponent from "./components/homePageComponet/homePage";

function App() {
  return (
    <>
    <HeaderComponent/>
    <Router className="main-router">
      <Routes>
        <Route path="/homepage" element={<HomePageComponent/>}/>
        <Route path="/register" element={<RegisterComponent/>}/>
        <Route path="/" element={<LoginComponent/>}/>
        <Route path="/projectList" element={<ProjectList />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/tasks/:id" element={<TaskDetails />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
