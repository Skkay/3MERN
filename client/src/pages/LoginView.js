import React, { useState } from "react";
import LoginForm from "../components/Authentication/LoginForm.js";
import RegisterForm from "../components/Authentication/RegisterForm.js";

const LoginView = () => {
  const [loginFormComponent, setLoginFormComponent] = useState(true)
  const [registerFormComponent, setRegisterFormComponent] = useState(false)

  const handleClick = (e) => {
    if (e.target.id === "register") {
      setLoginFormComponent(false);
      setRegisterFormComponent(true);
    } else if (e.target.id === "login") {
      setLoginFormComponent(true);
      setRegisterFormComponent(false);
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-4">
        <div className="card">
          <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item">
                <button className={loginFormComponent ? "nav-link ButtonLink  active" : "nav-link ButtonLink"} id="login" onClick={handleClick}>Sign in</button>
              </li>
              <li className="nav-item">
                <button className={registerFormComponent ? "nav-link ButtonLink active" : "nav-link ButtonLink"} id="register" onClick={handleClick}>Sign up</button>
              </li>
            </ul>
          </div>
          {loginFormComponent && <LoginForm />} 
          {registerFormComponent && <RegisterForm />}
        </div>
      </div>
    </div>
  );
};

export default LoginView;
