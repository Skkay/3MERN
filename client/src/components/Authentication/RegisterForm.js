import React from "react";

const RegisterForm = () => {
  return (
    <div className="card-body">
      <h4>Register</h4>
      <hr />
      <form>
        <div className="form-group">
          <label for="firstname">First name</label>
          <input type="text" className="form-control" id="firstname" />
        </div>
        <div className="form-group">
          <label for="lastname">Last name</label>
          <input type="text" className="form-control" id="lastname" />
        </div>
        <div className="form-group">
          <label for="email">Email address</label>
          <input type="email" className="form-control" id="email" />
        </div>
        <div className="form-group">
          <label for="password">Password</label>
          <input type="password" className="form-control" id="password" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default RegisterForm;
