import { Accordion, Carousel } from "react-bootstrap";

const MyHeader = () => {
  return (
    <div className="my-3">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            We provide weather forecasts for every city in the world, click to
            search major cities.
          </Accordion.Header>
          <Accordion.Body className="p-0">
            <div>
              <Carousel data-bs-theme="light">
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://images.pexels.com/photos/427679/pexels-photo-427679.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="First slide"
                  />
                  <Carousel.Caption>
                    <h5>London</h5>
                    <p>Check the weather for London</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Second slide"
                  />
                  <Carousel.Caption>
                    <h5>Rome</h5>
                    <p>Check the weather for Rome</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://images.pexels.com/photos/670261/pexels-photo-670261.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt="Third slide"
                  />
                  <Carousel.Caption>
                    <h5>Madrid</h5>
                    <p>Check the weather for Madrid</p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default MyHeader;
