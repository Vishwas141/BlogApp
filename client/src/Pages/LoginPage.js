import React, { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import {Navigate} from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { UserContext } from "../userContext";

const LoginPage = () => 
{
  const [user,setUser]=useState("");
  const [pass,setPassword]=useState("");
  const [redirect,setRedirect]=useState(false);
  const navigate = useNavigate();
  const {setUserInfo}=useContext(UserContext);

  async function login(e)
  {
    e.preventDefault();
    console.log(user,pass);
   const resp= await axios.post("http://localhost:4000/login",{username:user,password:pass},{withCredentials:true});

   if(resp.data.success)
   {
     
     setRedirect(true);
     setUserInfo(resp.data.data);
     console.log(resp.data.data,"data");

     navigate("/");
   }
  else
  {
    navigate("/login");
  }


  }

  return (
    <form className="login" onSubmit={login}>
      <h1 className="font-bold text-[30px]">Login</h1>
      <input type="text" placeholder="username"  onChange={(e)=>setUser(e.target.value)} value={user}/>
      <input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)}   value={pass}/>
      <button>Submit</button>
    </form>
  );
};

export default LoginPage;
