import { useEffect, useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import MySidebar from "./MySidebar";
import MyHeader from "./MyHeader";
import { useNavigate } from "react-router-dom";
import { parse, format } from "date-fns";

const MainContent = ({ search, getSearch }) => {
  const [cityData, setCityData] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const [forecastData, setforecastData] = useState({});
  const [forecastDays, setForecastDays] = useState([]);
  const [forecastInput, setforecastInput] = useState(false);
  const [urlToUse, setUrlTouse] = useState("");

  const indicesToRender = [0, 1, 3, 5, 6];
  const indicesToRender2 = [5, 14, 19, 28, 35];

  console.log(search);

  const imagesUrls = [
    "https://img.icons8.com/fluency/48/summer.png",
    "https://img.icons8.com/fluency/48/cloud.png",
    "https://img.icons8.com/fluency/48/heavy-rain.png",
    "https://img.icons8.com/fluency/96/partly-cloudy-rain.png",
    "https://img.icons8.com/fluency/48/snow.png",
  ];

  const getDataByLongandlat = () => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
        search.lat +
        "&lon=" +
        search.lon +
        "&appid=25b79b4a25cd7a32ae9e3bdea7231540"
    )
      .then((res) => {
        if (res.ok) {
          console.log("res ok", res);
          return res.json();
        } else {
          throw new Error("error");
        }
      })
      .then((data) => {
        setTimeout(() => {
          setCityData(data);
          setisLoading(false);
        }, 500);

        seturl(data.weather[0].main);
        setTimeout(() => {
          getForecastData();
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  };

  const getForecastData = () => {
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?lat=" +
        search.lat +
        "&lon=" +
        search.lon +
        "&appid=25b79b4a25cd7a32ae9e3bdea7231540"
    )
      .then((res) => {
        if (res.ok) {
          console.log("res ok");
          return res.json();
        } else {
          throw new Error("error");
        }
      })
      .then((data) => {
        const filteredDataForecast = indicesToRender.map(
          (index) => data.list[index]
        );

        const filteredDataForecast2 = indicesToRender2.map(
          (index) => data.list[index]
        );

        setforecastData(filteredDataForecast);
        setForecastDays(filteredDataForecast2);

        setTimeout(() => {
          setisLoading(true);
          setforecastInput(true);
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  };

  const seturl = (param) => {
    if (param === "Clear") {
      setUrlTouse(imagesUrls[0]);
    } else if (param === "Clouds") {
      setUrlTouse(imagesUrls[1]);
    } else if (param === "Rain") {
      setUrlTouse(imagesUrls[2]);
    } else if (param === "Snow") {
      setUrlTouse(imagesUrls[4]);
    } else if (param === "Mist") {
      setUrlTouse(imagesUrls[3]);
    }
  };

  useEffect(() => {
    if (getSearch) {
      getDataByLongandlat();
    }
  }, [search]);

  return (
    <div>
      <MyHeader />

      {isLoading ? (
        <>
          <Container fluid className="d-flex px-4 justify-content-between mb-4">
            <Row className=" flex-column row-card">
              <Col className="d-flex  col-card1 align-items-center">
                <div className="d-flex flex-column justify-content-between w-75">
                  {" "}
                  <h1>
                    {cityData.name},<span> {search.country}</span>
                  </h1>
                  <p>{cityData.weather[0].description}</p>
                  <div>
                    <h1>{(cityData.main.temp - 273.15).toFixed(1)}°C</h1>
                  </div>
                </div>
                <div>
                  <img width="100" height="100" src={urlToUse} alt="summer" />
                </div>
              </Col>

              <Col className="my-2 col-card1">
                <h6 className="fw-bold">Hourly forecast</h6>
                {forecastInput && forecastData && (
                  <div className="d-flex justify-content-around">
                    {forecastData.map((day, i) => {
                      const weatherType = day.weather[0].main;
                      const dateString = day.dt_txt;
                      const dateObject = parse(
                        dateString,
                        "yyyy-MM-dd HH:mm:ss",
                        new Date()
                      );
                      const formattedDate = format(dateObject, "HH:mm");

                      let imageUrl = "";
                      if (weatherType === "Clear") {
                        imageUrl = imagesUrls[0];
                      } else if (weatherType === "Clouds") {
                        imageUrl = imagesUrls[1];
                      } else if (weatherType === "Rain") {
                        imageUrl = imagesUrls[2];
                      } else if (weatherType === "Snow") {
                        imageUrl = imagesUrls[4];
                      }

                      return (
                        <div
                          key={i}
                          className="d-flex flex-column align-items-center  w-25  forecast-card "
                        >
                          <p>{formattedDate}</p>
                          <div className="d-flex justify-content-center ">
                            <img
                              width="60"
                              height="60"
                              src={imageUrl}
                              alt={weatherType}
                            />
                          </div>
                          <h3>{(day.main.temp - 273.15).toFixed(1)}°C</h3>
                        </div>
                      );
                    })}
                  </div>
                )}
              </Col>
              <Col className="d-flex mt-2  col-card1 align-items-center">
                <div className="d-flex flex-column w-100 justify-content-center forecast1">
                  <div className="d-flex justify-content-between">
                    <h6 className="fw-bold">Air conditions</h6>
                    <Button className="rounded-pill shadow">See more</Button>
                  </div>
                  <div className="d-flex ">
                    <div className="d-flex flex-column w-25 text-center my-1">
                      <p>
                        <span>
                          <i className="bi bi-thermometer-sun"></i>
                        </span>
                        Real feel
                      </p>
                      <h2>
                        {(cityData.main.feels_like - 273.15).toFixed(1)}°C
                      </h2>
                    </div>
                    <div className="d-flex flex-column w-75 text-center">
                      <p>
                        <span>
                          <i className="bi bi-wind"></i>
                        </span>
                        Wind
                      </p>
                      <h2>{cityData.wind.speed.toFixed(0)}Km/h</h2>
                    </div>
                  </div>
                  <div className="d-flex ">
                    <div className="d-flex flex-column w-25 text-center">
                      <p>
                        <span>
                          <i className="bi bi-droplet-half"></i>
                        </span>
                        Humidity
                      </p>
                      <h2>{cityData.main.humidity}% </h2>
                    </div>
                    <div className="d-flex flex-column w-75 text-center my-1">
                      <p>
                        <span>
                          <i className="bi bi-thermometer-snow"></i>
                        </span>
                        Temperatures
                      </p>
                      <h5>
                        <span>
                          <i className="bi bi-thermometer-high"></i>
                        </span>
                        {(cityData.main.temp_max - 273.15).toFixed(1)}°C
                      </h5>
                      <h5>
                        <span>
                          <i className="bi bi-thermometer-low"></i>
                        </span>
                        {(cityData.main.temp_min - 273.15).toFixed(1)}°C
                      </h5>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <MySidebar days={forecastDays} imgurl={imagesUrls} />
          </Container>
        </>
      ) : (
        <>
          <div className="d-flex justify-content-center mt-5">
            <div class="spinner">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MainContent;
