import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import axios from 'axios';
import cookie from "js-cookie";
import Clock from "react-live-clock";


const Navbar = () => {
  const uid = useContext(UidContext);

  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };

  const handleLogout = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/user/logout`,
      withCredentials: true,
    })
      .then(() => removeCookie("jwt"))
      .catch((err) => console.log(err));
    
    window.location = "/";
  }

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light mb-4">
      <div className="mx-auto d-sm-flex d-block flex-sm-nowrap">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse text-center" id="navbarText">
            <ul className="navbar-nav">
              <li className="nav-item"><a className="nav-link ButtonLink" href="/">Home</a></li>
              <li className="nav-item mx-4">
                <dl>
                  <li><Clock format={'dddd, MMMM D'} ticking={true} /></li>
                  <li><Clock format={'HH:mm:ss'} ticking={true} /></li>
                </dl>
              </li>
              {uid ? (
                <li className="nav-item"><button className="nav-link ButtonLink" onClick={handleLogout}>Sign out</button></li>
              ) : (
                <li className="nav-item"><a className="nav-link ButtonLink" href="/login">Sign in or Sign up</a></li>
              )}
            </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
