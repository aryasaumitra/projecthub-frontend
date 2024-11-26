import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginComponent from "./components/loginSignupComponent/Login";
import RegisterComponent from "./components/loginSignupComponent/Register";
import HeaderComponent from "./components/headerComponent/header";
import HomePageComponent from "./components/homePageComponet/homePage";
import Logout from "./components/loginSignupComponent/Logout";

function App() {
  return (
    <>
    <HeaderComponent/>
    <Router className="main-router">
      <Routes>
        <Route path="/homepage" element={<HomePageComponent/>}/>
        <Route path="/register" element={<RegisterComponent/>}/>
        <Route path="/" element={<LoginComponent/>}/>
        <Route path="/logout" element={<Logout/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
