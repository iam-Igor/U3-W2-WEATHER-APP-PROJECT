import {
  Navbar,
  NavDropdown,
  NavLink,
  Container,
  Nav,
  Form,
  Row,
  Col,
  Button,
} from "react-bootstrap";

const MyNavbar = ({ submit, search, setSearch }) => {
  return (
    <>
      <Navbar expand="lg" className="p-0 sticky-top">
        <Container fluid className="p-0 py-2 navcont">
          <Navbar.Brand href="#home" className="ms-2">
            <img
              src="https://cdn3.iconfinder.com/data/icons/luchesa-vol-9/128/Weather-512.png"
              width="30"
              height="30"
              className="d-inline-block align-top me-2"
              alt="weather logo"
            />
            isItRaining.com
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav ">
            <Nav className="me-auto ms-2">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">About</Nav.Link>
              <NavDropdown title="Sections" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">
                  Current Weather
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Hourly Forecast
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Our APIs</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form
              className="me-4 ms-2"
              onSubmit={(e) => {
                e.preventDefault();
                submit();
              }}
            >
              <Row>
                <Col xs="auto">
                  <Form.Control
                    type="text"
                    placeholder="Search for Cities.."
                    className=" mr-sm-2"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    required
                  />
                </Col>
                <Col xs="auto">
                  <Button type="submit" className="form-btn">
                    Find City
                  </Button>
                </Col>
              </Row>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default MyNavbar;
