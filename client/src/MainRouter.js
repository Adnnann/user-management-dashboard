import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/core/Header";
import AllUsers from "./components/user/AllUsers";
import EditProfile from "./components/user/EditUserProfile";
import CreateUser from "./components/user/CreateUser";
import DeleteAccountModal from "./components/user/DeleteAccountModal";
import AssignUserRole from "./components/user/AssignUserRole";
import ViewUserProfile from "./components/user/ViewUserProfile";
import { Navigate } from "react-router-dom";

function MainRouter() {
  return (
    <Router>
      <Header />
      <AssignUserRole />
      <DeleteAccountModal />
      <Routes>
        <Route path="/" element={<AllUsers />}></Route>
        <Route path="/editProfile" element={<EditProfile />}></Route>
        <Route path="/viewProfile" element={<ViewUserProfile />}></Route>
        <Route path="/addUser" element={<CreateUser />}></Route>
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
}

export default MainRouter;
