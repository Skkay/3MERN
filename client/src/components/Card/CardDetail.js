import React from "react";

const CardDetail = (props) => {
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
    <div className="card m-3" style={{width: "30rem"}}>  
      <div className="card-body">
        <div className="row">
          <div className="col-8 col-sm-6">
            <h5 className="card-title">{new Date(props.timestamp * 1000).toLocaleDateString('en-US', {weekday: 'long', month: 'long', day: 'numeric'})}</h5>
            <p className="card-text text-muted text-capitalize">{props.weatherDescription}</p>
            <h1>{Math.round(props.tempMax - 273.15)}°C <span className="text-muted">{Math.round(props.tempMin - 273.15)}°C</span></h1>
            <hr />
            <p className="m-0">Humidity: {props.humidity}%</p>
            <p className="m-0">Wind: {props.windSpeed} km/h, {['N','NE', 'E','SE', 'S','SW', 'W','NW'][Math.floor(((props.windDir+22.5)%360)/45)]}</p>
            <hr />
            <p className="m-0">{new Date(props.sunrise * 1000).toLocaleTimeString().slice(0, -3)} - {new Date(props.sunset * 1000).toLocaleTimeString().slice(0, -3)}</p>
          </div>
          <div className="col-4 col-sm-6">
            <img src={`${process.env.REACT_APP_PUBLIC_URL}/assets/weather_icons/${img}_light.png`} alt={img} className="img-thumbnail" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
