import React from "react";
import "./newsletter.css";

import person from "../assets/images/male-tourist.png";
import { Container, Row, Col } from "reactstrap";

const Newsletter = () => {
  return (
    <section className="newsletter">
      <Container>
        <Row>
          <Col lg="6">
            <div className="newsletter__content">
              <h2>Subscribe now to get new products and stock update.</h2>

              <div className="newsletter__input">
                <input type="email" placeholder="Enter your email" />

                <button className="btn newsletter__btn">Subscribe</button>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam
                consequatur ex, eligendi illo iure praesentium?
              </p>
            </div>
          </Col>

          <Col lg="6">
            <div className="newsletter__img">
              <img src={person} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Newsletter;
