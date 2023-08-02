import React, { useEffect } from "react";
import "../styles/home.css";
import Subtitle from "../shared/Subtitle";
import { Container, Row, Col } from "reactstrap";
import worldImg from "../assets/images/world.png";

import FeaturedProductList from "../components/Featured-products/FeaturedProductList";
import Testimonials from "../components/Testimonial/Testimonials";
import Newsletter from "../shared/Newsletter";
import SaleSlide from "../components/SaleSlide/SaleSlide";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="hero__content">
                <div className="hero__subtitle d-flex align-items-center">
                  <Subtitle subtitle={"Best deals and best Products"} />
                  <img src={worldImg} alt="" />
                </div>

                <h1>
                  Shop your favorite products and{" "}
                  <span className="highlight">enjoy</span>
                </h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero,
                  magni esse. Ipsam labore distinctio amet eaque vel vitae!
                  Neque debitis, consequuntur in illum temporibus aliquam ut
                  dolorem. Consequatur, reiciendis magnam!
                </p>
              </div>
            </Col>

            <Col lg="6">
              <SaleSlide />
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <Subtitle subtitle={"Explore"} />
              <h2 className="featured__tour-title">Our Products</h2>
            </Col>
            <FeaturedProductList />
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Customer"} />
              <h2 className="testimonial__title">
                {" "}
                What our regular cutomer say about our service
              </h2>
            </Col>
            <Col lg={12}>
              <Testimonials />
            </Col>
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default Home;
