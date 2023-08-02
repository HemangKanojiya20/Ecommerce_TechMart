import React from "react";
import Slider from "react-slick";
import sale01 from "../../assets/sale-images/1.jpg";
import sale02 from "../../assets/sale-images/2.jpg";
import sale03 from "../../assets/sale-images/3.jpg";
const SaleSlide = () => {
  const settings = {
    dots: true,
    Infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slidesToShow: 2,

    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      <div>
        <div className="d-flex align-items-center gap-4 mt-3">
          <img
            src={sale01}
            width={"70%"}
            height={"70%"}
            className="rounded-2"
            alt=""
          />
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <div className="d-flex align-items-center gap-4 mt-3">
          <img
            src={sale02}
            className="rounded-2"
            width={"70%"}
            height={"70%"}
            alt=""
          />
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <div className="d-flex align-items-center gap-4 mt-3">
          <img
            src={sale03}
            className=" rounded-2"
            width={"70%"}
            height={"70%"}
            alt=""
          />
        </div>
      </div>
    </Slider>
  );
};

export default SaleSlide;
