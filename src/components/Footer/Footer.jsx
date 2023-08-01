import React from "react";
import "./footer.css";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";

const quick__links = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/products",
    display: "Products",
  },
];

const quick__links2 = [
  {
    path: "/cart",
    display: "Cart",
  },
  {
    path: "/orderHistory",
    display: "Your Recent Orders",
  },
  {
    path: "/login",
    display: "Login",
  },
  {
    path: "/register",
    display: "Register",
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="3">
            <div className="logo">
              <Link to={"/home"}>
                <h4
                  style={{
                    borderBottom: "3px solid #FAA935",
                    marginBottom: "0",
                    width: "135px",
                  }}
                >
                  <span style={{ color: "#FAA935" }}>E </span>commerce
                </h4>
                <h6>Tech Mart</h6>
              </Link>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit,
                atque.
              </p>

              <div className="social__links d-flex align-items-center gap-4">
                <span>
                  <Link to="#">
                    <i className="ri-youtube-line"></i>{" "}
                  </Link>
                </span>
                <span>
                  <Link to="#">
                    <i className="ri-github-fill"></i>{" "}
                  </Link>
                </span>
                <span>
                  <Link to="#">
                    <i className="ri-facebook-circle-line"></i>{" "}
                  </Link>
                </span>
                <span>
                  <Link to="#">
                    <i className="ri-instagram-line"></i>{" "}
                  </Link>
                </span>
              </div>
            </div>
          </Col>

          <Col lg="3">
            <h5 className="footer__link-title">Discover</h5>

            <ListGroup className="footer__quick-links">
              {quick__links.map((item, index) => (
                <ListGroupItem key={index} className="ps-0 border-0">
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          <Col lg="3">
            <h5 className="footer__link-title">Quick links</h5>

            <ListGroup className="footer__quick-links">
              {quick__links2.map((item, index) => (
                <ListGroupItem key={index} className="ps-0 border-0">
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          <Col lg="3">
            <h5 className="footer__link-title">Contact us</h5>

            <ListGroup className="footer__quick-links">
              <ListGroupItem className="ps-0 border-0 d-flex align-items-center">
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-map-pin-line"></i>
                  </span>
                  Address:
                </h6>
                <p className="mb-0"> Gujarat, India</p>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0 d-flex align-items-center">
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-mail-line"></i>
                  </span>
                  Email:
                </h6>
                <p className="mb-0"> abc@gmail.com</p>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0 d-flex align-items-center">
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-phone-line"></i>
                  </span>
                  Phone:
                </h6>
                <p className="mb-0"> +123456789</p>
              </ListGroupItem>
            </ListGroup>
          </Col>

          <Col lg="12" className="text-center pt-5">
            <p className="copyright">
              {" "}
              Copyright {year}, develope and design by Hemang Kanojiya
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
