import React, { useState } from "react";
import axios from 'axios';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/user/login`,
      withCredentials: true,
      data: {
        email: email,
        password: password,
      },
    })
    .then((res) => {
      window.location = "/";
    })
    .catch((err) => {
      console.error(err);
    })
  };

  return (
    <div className="card-body">
      <h4>Sign in</h4>
      <hr />
      <form action="" onSubmit={handleLogin} id="loginForm">
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button type="submit" className="btn btn-primary">Sign in</button>
      </form>
    </div>
  );
};

export default LoginForm;
