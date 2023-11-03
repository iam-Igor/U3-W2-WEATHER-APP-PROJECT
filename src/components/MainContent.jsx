import { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";

const MainContent = ({ search, getSearch }) => {
  const [cityData, setCityData] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const [forecastData, setforecastData] = useState({});

  const [urlToUse, setUrlTouse] = useState("");

  const imagesUrls = [
    "https://img.icons8.com/fluency/48/summer.png",
    "https://img.icons8.com/fluency/48/cloud.png",
    "https://img.icons8.com/fluency/48/heavy-rain.png",
    "https://img.icons8.com/fluency/48/partly-cloudy-day.png",
    "https://img.icons8.com/fluency/48/snow.png",
  ];

  console.log(search);
  console.log(cityData);

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
        setforecastData(data);
        setisLoading(true);
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
      getForecastData();
    }
  }, [search]);

  return (
    <div>
      {isLoading && (
        <>
          <Container fluid className="d-flex px-4 justify-content-between">
            <Row className=" flex-column row-card">
              <Col className="d-flex mt-2  col-card1 align-items-center">
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

              <Col className="d-flex my-2  col-card1 align-items-center"></Col>
            </Row>
            <Row className="d-none d-md-block w-25">
              <Col className="col-card1">search</Col>
            </Row>
          </Container>
        </>
      )}
    </div>
  );
};

export default MainContent;
