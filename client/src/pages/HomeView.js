import React, { useState, useContext, useEffect } from "react";
import { UidContext } from "../components/AppContext";
import Card from "../components/Card/Card"

const Home = () => {
  const uid = useContext(UidContext);
  const [endFetch, setEndFetch] = useState(false);
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    if (!uid) return;

    fetch(`${process.env.REACT_APP_API_URL}/user/getFavoriteCitiesWeatherData/${uid}`)
      .then((response) => response.json())
      .then((responseJson) => {
        setWeatherData(responseJson);
        setEndFetch(true);
      })
      .catch((error) => {
        console.error(error);
      });

  }, [uid]);

  return (
    <div>
      Home page
    </div>
  );
};

export default Home;
