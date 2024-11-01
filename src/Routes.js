import React from "react";
import Home from "./User/Screens/Home";
import Login from "./User/Screens/Login";
import SignUp from "./User/Screens/SignUp";
import AdminLogin from "./Admin/Screens/AdminLogin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminHome from "./Admin/Components/AdminHome";
import UserHome from "./User/Components/UserHome";
// import ApplicationScreen from "./User/Screens/DetailsScreen";
export default function RoutesComponent() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/UserHome/:name" element={<UserHome />} />
        {/* <Route path="/UserHome/view-application" element={<ApplicationScreen />} /> */}
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/AdminHome/:name" element={<AdminHome />} />
      </Routes>
    </Router>
  );
}
