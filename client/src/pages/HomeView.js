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
      {uid ? [
        (endFetch ? (
          <div className="d-flex flex-wrap justify-content-center">
        {weatherData.map((data) => (
          <Card 
            name={data.name} 
            country={data.sys.country}
            weatherMain={data.weather[0].main}
            weatherDescription={data.weather[0].description}
            temp={data.main.temp}
            tempFeelsLike={data.main.feels_like}
            tempMin={data.main.temp_min}
            tempMax={data.main.temp_max}
            humidity={data.main.humidity}
            windSpeed={data.wind.speed}
            windDir={data.wind.deg}
            sunrise={data.sys.sunrise}
            sunset={data.sys.sunset} 
            cityId={data.id} 
            lon={data.coord.lon}
            lat={data.coord.lat} />
          ))}
        </div>
        ) : (
          <p>Loading...</p>
        ))
      ] : (
        <p className="text-center">You must be connected to save and display your favorite cities. <a href="/login">Sign in / Sign up</a></p>
      )}
    </div>
  );
}

export default Home;
