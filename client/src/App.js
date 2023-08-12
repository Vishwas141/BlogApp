import "./App.css";
import React from "react";
import Post from "./component/Post";
import Header from "./component/Header";
import { Route, Routes } from "react-router-dom";
import Layout from "./component/Layout";
import IndexPage from "./Pages/IndexPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import { UserContextProvider } from "./userContext";
import CreatePost from "./component/CreatePost";
import PostPage from "./Pages/PostPage";
import EditPost from "./component/EditPost";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
   
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create" element={<CreatePost/>}></Route>
          <Route path="/post/:id" element={<PostPage/>}></Route>
          <Route path="/edit/:id" element={<EditPost/>}></Route>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
