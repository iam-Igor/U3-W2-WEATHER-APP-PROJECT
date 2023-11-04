import { Row, Col } from "react-bootstrap";
import { parse, format } from "date-fns";

const MySidebar = ({ days, imgurl }) => {
  return (
    <Row className="d-none d-md-flex sidebar flex-column col-card1 align-items-between">
      <h6>5-day Forecast</h6>
      {days.map((day, index) => {
        const dateString = day.dt_txt;
        const dateObject = parse(dateString, "yyyy-MM-dd HH:mm:ss", new Date());
        const formattedDate = format(dateObject, "dd/MM");

        const weatherType = day.weather[0].main;

        let imageUrl = "";
        if (weatherType === "Clear") {
          imageUrl = imgurl[0];
        } else if (weatherType === "Clouds") {
          imageUrl = imgurl[1];
        } else if (weatherType === "Rain") {
          imageUrl = imgurl[2];
        } else if (weatherType === "Snow") {
          imageUrl = imgurl[4];
        }
        return (
          <Col
            key={index}
            className="d-flex justify-content-between align-items-center"
          >
            <div className="fw-bold">{formattedDate}</div>
            <div className="d-flex align-items-center">
              <img src={imageUrl} className="me-2" />
              <p className="m-0 fw-bold">{day.weather[0].main}</p>
            </div>
            <div>{(day.main.temp - 273.15).toFixed(1)}°C</div>
          </Col>
        );
      })}
    </Row>
  );
};

export default MySidebar;
