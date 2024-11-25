import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProjectList from "./pages/projectList";
import TaskList from "./pages/taskList";
import TaskDetails from "./pages/taskListDetails";
import Register from "./pages/register";
import Login from "./pages/login";
import LoginComponent from "./components/loginSignupComponent/Login";
import RegisterComponent from "./components/loginSignupComponent/Register";
import HeaderComponent from "./components/headerComponent/header";
import HomePageComponent from "./components/homePageComponet/homePage";

function App() {
  return (
    <>
    <HeaderComponent/>
    <Router className="main-router">
      {/* <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <Link className="navbar-brand" to="/">ProjectHub</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/tasks">Tasks</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Register</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login-main">Login Main</Link>
            </li>
          </ul>
        </div>
      </nav> */}
      <Routes>
        <Route path="/homepage" element={<HomePageComponent/>}/>
        <Route path="/register-main" element={<RegisterComponent/>}/>
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
