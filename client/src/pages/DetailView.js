import React from "react";
import CardDetail from "../components/Card/CardDetail";
import qs from 'qs';

export default class DetailView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    };
  }

  componentWillMount() {
    this.renderMyData();
  }

  renderMyData() {
    const lon = qs.parse(this.props.location.search, { ignoreQueryPrefix: true}).lon
    const lat = qs.parse(this.props.location.search, { ignoreQueryPrefix: true}).lat
    
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lon=${lon}&lat=${lat}&exclude=current,minutely,hourly,alerts&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ data: responseJson });
        console.log(this.state.data.daily[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
        <h2 className="text-center">{qs.parse(this.props.location.search, { ignoreQueryPrefix: true}).city}, {qs.parse(this.props.location.search, { ignoreQueryPrefix: true}).code}</h2>
        {this.state.data ? (
          <div className="d-flex flex-wrap justify-content-center">
            {this.state.data.daily.map(function(day) {
              return <CardDetail 
                timestamp={day.dt}
                weatherMain={day.weather[0].main}
                weatherDescription={day.weather[0].description}
                tempMax={day.temp.max}
                tempMin={day.temp.min}
                humidity={day.humidity}
                windDir={day.wind_speed}
                windSpeed={day.wind_deg}
                sunrise={day.sunrise}
                sunset={day.sunset} />
            })}
          </div>
        ) : (
          <p className="text-muted">Loading</p>
        )}
      </div>
    );
  }
}
