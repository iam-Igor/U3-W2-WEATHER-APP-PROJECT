import { useEffect, useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";

const MainContent = ({ search, getSearch }) => {
  const [cityData, setCityData] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const [forecastData, setforecastData] = useState({});
  const [forecastInput, setforecastInput] = useState(false);
  const [urlToUse, setUrlTouse] = useState("");
  const indicesToRender = [1, 3, 5, 6];

  const imagesUrls = [
    "https://img.icons8.com/fluency/48/summer.png",
    "https://img.icons8.com/fluency/48/cloud.png",
    "https://img.icons8.com/fluency/48/heavy-rain.png",
    "https://img.icons8.com/fluency/48/partly-cloudy-day.png",
    "https://img.icons8.com/fluency/48/snow.png",
  ];

  const getDataByLongandlat = () => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
        search.lat +
        "&lon=" +
        search.lon +
        "&appid=0558a26d894990857b4f5ee4b1604f20"
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
        console.log(data);
        setCityData(data);
        setisLoading(true);

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
        "&appid=0558a26d894990857b4f5ee4b1604f20"
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
        console.log(data, "forecast");

        const filteredDataForecast = indicesToRender.map(
          (index) => data.list[index]
        );

        setforecastData(filteredDataForecast);

        setisLoading(true);
        setforecastInput(true);
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
    }
  };

  useEffect(() => {
    if (getSearch) {
      getDataByLongandlat();
    }
  }, [search]);

  return (
    <div>
      {isLoading && (
        <>
          <Container fluid className="d-flex px-4 justify-content-between">
            <Row className=" flex-column row-card">
              <Col className="d-flex  col-card1 align-items-center">
                <div className="d-flex flex-column justify-content-between w-75">
                  {" "}
                  <h1>{cityData.name}</h1>
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
                <p className="fw-bold">Today's forecast</p>
                {forecastInput && forecastData && (
                  <div className="d-flex justify-content-around">
                    {forecastData.map((day, i) => {
                      const weatherType = day.weather[0].main;

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
                          <p>{day.dt_txt.split(" ")[1]}</p>
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
                <div className="d-flex flex-column w-100">
                  <div className="d-flex justify-content-between">
                    <p className="fw-bold">Air conditions</p>
                    <Button className="rounded-pill shadow">See more</Button>
                  </div>
                  <div className="d-flex">
                    <div className="d-flex flex-column">
                      real temp + <p>chances of rain</p>
                    </div>
                    <div>
                      {" "}
                      wind + <p>uv index</p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="d-none d-md-block sidebar">
              <Col className="col-card1">search</Col>
            </Row>
          </Container>
        </>
      )}
    </div>
  );
};

export default MainContent;
