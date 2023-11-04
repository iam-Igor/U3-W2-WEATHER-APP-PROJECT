import { Container, Row, Col } from "react-bootstrap";
import { getYear } from "date-fns";

const MyFooter = () => {
  const currentYear = getYear(new Date());

  return (
    <Container fluid className="footer mt-4 p-4">
      <Row>
        <Col className="d-flex align-items-center flex-column">
          <ul className="list-unstyled d-flex justify-content around">
            <li className="mx-2">Home</li>
            <li className="mx-2">About</li>
            <li className="mx-2">Contacts</li>
          </ul>
          <div>
            <img
              src="https://cdn3.iconfinder.com/data/icons/luchesa-vol-9/128/Weather-512.png"
              width="30"
              height="30"
              className="d-inline-block align-top me-2"
              alt="weather logo"
            />
            isItRaining.com©<span>{currentYear}</span>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default MyFooter;
