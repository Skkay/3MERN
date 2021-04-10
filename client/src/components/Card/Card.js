import React, { useState } from "react";

const Card = (props) => {
  const width = "37.6rem";
  const [liked, setLiked] = useState(true);

  return (
    <div className="card m-3" style={{width: width}}>
      <div className="card-body">
        <div className="row">
          <div className="col-8 col-sm-6">
            <h5 className="card-title"><button className="ButtonLink p-0 mr-2"><i className={liked ? "bi bi-heart-fill" : "bi bi-heart"} style={{color: "#E0245E"}} /></button>Paris, FR</h5>
            <p className="card-text text-muted text-capitalize">broken clouds</p>
            <h1>20°C</h1>
            <p className="m-0 font-weight-bold">Feels like: 18°C</p>
            <p className="m-0">Min: 9°C</p>
            <p className="m-0">Max: 23°C</p>
            <hr />
            <p className="m-0">Humidity: 55</p>
            <p className="m-0">Wind speed: 5.14 km/h, 230°</p>
            <hr />
            <p className="m-0">00h00 - 00h00</p>
          </div>
          <div className="col-4 col-sm-6">
            <img src={process.env.REACT_APP_PUBLIC_URL + '/assets/weather_icons/cloudy_light.png'} alt="cloudy" className="img-thumbnail" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
