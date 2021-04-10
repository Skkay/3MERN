import React, { useState } from "react";
import axios from 'axios';
import Card from "../components/Card/Card"

const SearchView = () => {
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
      <form className="mx-3" action="">
        <div class="input-group mb-3">
          <input type="text" class="form-control" onChange={(e) => setSearch(e.target.value)} />
          <div class="input-group-append">
            <button class="btn btn-primary" type="submit">Search</button>
          </div>
        </div>
      </form>
      <div className="d-flex flex-wrap">
        <Card />
      </div>
    </div>
  );
};

export default SearchView;
