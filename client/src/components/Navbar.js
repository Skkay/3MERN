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
    <nav className="navbar navbar-expand navbar-light bg-light mb-4">
      <div className="mx-auto text-center">
        <ul className="navbar-nav">
          <li className="nav-item"><a className="nav-link ButtonLink" href="/">Home</a></li>
          <li className="nav-item mx-4">
            <dl>
              <li><Clock format={'dddd, MMMM D'} ticking={true} /></li>
              <li><Clock format={'HH:mm:ss'} ticking={true} /></li>
            </dl>
          </li>
          {uid ? (
            <li className="nav-item" style={{width: "80px"}}><button className="nav-link ButtonLink" onClick={handleLogout}>Sign out</button></li>
          ) : (
            <li className="nav-item" style={{width: "80px"}}><a className="nav-link ButtonLink" href="/login">Sign in</a></li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
