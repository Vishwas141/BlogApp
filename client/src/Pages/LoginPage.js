import React from "react";

const LoginPage = () => {
  return (
    <form className="login">
      <h1 className="font-bold text-[30px]">Login</h1>
      <input type="text" placeholder="userame" />
      <input type="password" placeholder="password" />
      <button>Submit</button>
    </form>
  );
};

export default LoginPage;
