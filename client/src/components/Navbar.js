import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../components/AppContext";
import axios from 'axios';
import cookie from "js-cookie";
import Clock from "react-live-clock";


const Navbar = () => {
  const html = document.getElementsByTagName('html')[0];
  const [theme, setTheme] = useState();
  const uid = useContext(UidContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Handle theme mode on page load
    if (cookie.get("theme") === "dark") {
      html.style.filter = "invert(0.9) hue-rotate(180deg)";
      setTheme('dark');
    } else {
      html.style.filter = "";
      setTheme('light');
    }
  }, [html.style])

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  }

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

  const handleSwitchTheme = () => {
    if (cookie.get("theme") === "light") {
      cookie.set("theme", "dark");
      html.style.filter = "invert(0.9) hue-rotate(180deg)";
      setTheme('dark');
    } else {
      cookie.set("theme", "light");
      html.style.filter = "";
      setTheme('light');
    }
  }

  return (
    <nav className="navbar navbar-expand navbar-light bg-light mb-4">
      <div className="mx-auto text-center">
        <ul className="navbar-nav">
          <li className="nav-item" style={{width: "80px"}}><a className="nav-link ButtonLink" href="/">Home</a></li>
          <li className="nav-item mx-4">
            <dl>
              {windowWidth < 435 ? (
                <li><Clock format={'ddd, MMM D'} ticking={true} /></li>
              ) : (
                <li><Clock format={'dddd, MMMM D'} ticking={true} /></li>
              )}
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
      <button className="ButtonLink" onClick={handleSwitchTheme}><i className={theme === "dark" ? "bi bi-moon-stars-fill" : "bi bi-sun-fill"} style={{color: "#1E1E1E"}} /></button>
    </nav>
  );
};

export default Navbar;
