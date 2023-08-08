import "./App.css";
import React from "react";
import Post from "./component/Post";
import Header from "./component/Header";
import { Route, Routes } from "react-router-dom";
import Layout from "./component/Layout";
import  IndexPage  from "./Pages/IndexPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<IndexPage />} />

        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>}/>
      </Route>
    </Routes>
  );
}

export default App;
