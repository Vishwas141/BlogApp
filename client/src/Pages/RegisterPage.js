import React, { useState } from "react";
import axios from "axios"

const RegisterPage = () => 
{
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');

    async function register(e)
    {
        e.preventDefault();

       await axios.post("http://localhost:4000/register",{username,password});
    }

  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input type="text" onChange={(e)=>setUsername(e.target.value)} placeholder="userame"  value={username}/>
      <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="password" value={password} />
      <button>Submit</button>
    </form>
  );
};

export default RegisterPage;
