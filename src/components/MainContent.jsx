import { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";

const MainContent = ({ search, getSearch }) => {
  const [cityData, setCityData] = useState({});
  const [isLoading, setisLoading] = useState(false);

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
          {/* <h1>{cityData.name}</h1>
          <p>
            {(cityData.main.temp - 273.15).toFixed(1)}
            °C
          </p> */}
          <Container fluid className="d-flex px-4 justify-content-between">
            <Row className=" align-items-center row-card1">
              <Col className="d-flex " xs={8} md={4}>
                <div className="d-flex flex-column justify-content-between">
                  {" "}
                  <h1>{cityData.name}</h1>
                  <p>{cityData.weather[0].description}</p>
                  <div>
                    <h1>{(cityData.main.temp - 273.15).toFixed(1)}°C</h1>
                  </div>
                </div>
              </Col>
              <Col xs={4} className="flex-grow-1 text-end">
                <img width="100" height="100" src={urlToUse} alt="summer" />
              </Col>
            </Row>
            <Row className="d-none d-md-block row-card2">
              <Col>
                {" "}
                <Col xs={4}>
                  <img width="100" height="100" src={urlToUse} alt="summer" />
                </Col>
              </Col>
            </Row>
          </Container>
          <Container fluid className="my-3 px-4">
            <Row className=" align-items-center row-card1">
              <Col className="d-flex " xs={8} md={4}>
                <div className="d-flex flex-column justify-content-between">
                  {" "}
                  <h1>{cityData.name}</h1>
                  <p>{cityData.weather[0].description}</p>
                  <div>
                    <h1>{(cityData.main.temp - 273.15).toFixed(1)}°C</h1>
                  </div>
                </div>
              </Col>
              <Col xs={4} className="flex-grow-1 text-end">
                <img width="100" height="100" src={urlToUse} alt="summer" />
              </Col>
            </Row>
          </Container>
        </>
      )}
    </div>
  );
};

export default MainContent;
