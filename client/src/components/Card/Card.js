import React, { useState, useContext } from "react";
import axios from 'axios';
import { UidContext } from "../../components/AppContext";
import Popup from 'reactjs-popup';

const Card = (props) => {
  const uid = useContext(UidContext);
  const [liked, setLiked] = useState(false);
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const contentStyle = { 
    background: '#F8D7DA',
    borderColor: '#F5C6CB',
    color: '#721C24',
    padding: '10px',
    textAlign: 'center',
    borderWidth: '0.2em',
    borderRadius: '3px'
  };

  const handleFavorite = () => {
    console.log("favorite button clicked");

    // If user is connected
    if (uid) {
      console.log("saved for", uid)

      // Add to favorite if not already liked
      if (!liked) {
        axios({
          method: "POST",
          url: `${process.env.REACT_APP_API_URL}/user/addToFavorite/${uid}`,
          withCredentials: true,
          data: {
            cityId: props.cityId,
          },
        })
        .then((res) => {
          setLiked(true);
        })
        .catch((err) => {
          console.error(err);
        });
      }

      // Remove from favorite if liked
      else {
        axios({
          method: "POST",
          url: `${process.env.REACT_APP_API_URL}/user/removeFromFavorite/${uid}`,
          withCredentials: true,
          data: {
            cityId: props.cityId,
          },
        })
        .then((res) => {
          setLiked(false);
        })
        .catch((err) => {
          console.error(err);
        });
      }
    }
    else {
      setOpen(true);
    }
  }

  let img = "foggy";
  if (props.weatherMain === "Clouds") {
    img = "cloudy";
  } else if (props.weatherMain === "Drizzle" || props.weatherMain === "Rain") {
    img = "raining";
  } else if (props.weatherMain === "Snow") {
    img = "snowing";
  } else if (props.weatherMain === "Thunderstorm") {
    img = "storm";
  } else if (props.weatherMain === "Clear") {
    img = "sunny";
  }

  return (
    <div className="card m-3" style={{width: "37.6rem"}}>  
      <div className="card-body">
        <div className="row">
          <div className="col-8 col-sm-6">
            <h5 className="card-title"><button className="ButtonLink p-0 mr-2" onClick={handleFavorite}><i className={liked ? "bi bi-heart-fill" : "bi bi-heart"} style={{color: "#E0245E"}} /></button>{props.name}, {props.country}</h5>
            <p className="card-text text-muted text-capitalize">{props.weatherDescription}</p>
            <h1>{Math.round(props.temp - 273.15)}°C</h1>
            <p className="m-0 font-weight-bold">Feels like: {Math.round(props.tempFeelsLike - 273.15)}°C</p>
            <p className="m-0">Min: {Math.round(props.tempMin - 273.15)}°C</p>
            <p className="m-0">Max: {Math.round(props.tempMax - 273.15)}°C</p>
            <hr />
            <p className="m-0">Humidity: {props.humidity}%</p>
            <p className="m-0">Wind: {props.windSpeed} km/h, {['N','NE', 'E','SE', 'S','SW', 'W','NW'][Math.floor(((props.windDir+22.5)%360)/45)]}</p>
            <hr />
            <p className="m-0 text-center">{new Date(props.sunrise * 1000).toLocaleTimeString().slice(0, -3)} - {new Date(props.sunset * 1000).toLocaleTimeString().slice(0, -3)}</p>
          </div>
          <div className="col-4 col-sm-6">
            <img src={`${process.env.REACT_APP_PUBLIC_URL}/assets/weather_icons/${img}_light.png`} alt={img} className="img-thumbnail" />
          </div>
        </div>
      </div>
      <Popup open={open} closeOnDocumentClick onClose={closeModal} contentStyle={contentStyle}>
        You must be connected to save this city
      </Popup>
    </div>
  );
};

export default Card;
