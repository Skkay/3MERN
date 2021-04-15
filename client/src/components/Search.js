import React, { useState } from "react";
import axios from 'axios';
import Card from "./Card/Card"

const Search = () => {
  const [search, setSearch] = useState('');
  const [found, setFound] = useState(false)
  const [data, setData] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();

    axios({
      method: "GET",
      url: `http://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`
    })
    .then((res) => {
      setData(res.data);
      setFound(true);
    })
    .catch((err) => {
      setFound(false);
      setData(null);
    });
  }

  return (
    <div>
      <form className="mx-3" action="" onSubmit={handleSearch} id="searchForm">
        <div className="input-group mb-3">
          <input type="text" className="form-control" onChange={(e) => setSearch(e.target.value)} />
          <div className="input-group-append">
            <button className="btn btn-primary" type="submit">Search</button>
          </div>
        </div>
      </form>
      <div className="d-flex justify-content-center">
      {found ? 
      (
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
      ) : (
        <p className="text-muted">City not found...</p>
      )}
      </div>
    </div>
  );
};

export default Search;
