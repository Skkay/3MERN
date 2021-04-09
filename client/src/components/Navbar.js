import React from "react";
import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";

const Navbar = () => {
  const uid = useContext(UidContext);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="container">
        <a className="navbar-brand" href="#">3MERN</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                  <a className="nav-link" href="#">Home</a>
              </li>
            </ul>
            {uid ? (
              <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" href="#">Deconnexion</a>
                </li>
              </ul>
            ) : (
            <ul className="navbar-nav">
              <li className="nav-item">
                  <a className="nav-link" href="/login">Connexion</a>
              </li>
            </ul>
            )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
