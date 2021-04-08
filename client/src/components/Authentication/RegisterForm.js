import React, { useState } from "react";
import axios from 'axios';

const RegisterForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/user/register`,
      withCredentials: true,
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      },
    })
    .then((res) => {
      window.location = "/login";
    })
    .catch((err) => {
      console.error(err);
    })
  }

  return (
    <div className="card-body">
      <h4>Register</h4>
      <hr />
      <form action="" onSubmit={handleRegister} id="registerForm">
        <div className="form-group">
          <label for="firstname">First name</label>
          <input type="text" className="form-control" id="firstname" required onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div className="form-group">
          <label for="lastname">Last name</label>
          <input type="text" className="form-control" id="lastname" required onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div className="form-group">
          <label for="email">Email address</label>
          <input type="email" className="form-control" id="email" required onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label for="password">Password</label>
          <input type="password" className="form-control" id="password" required onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default RegisterForm;
