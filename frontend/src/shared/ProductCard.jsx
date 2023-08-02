import React from "react";
import "./tour-card.css";

import calculateAvgRating from "../utils/avgRating";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { _id, title, description, price, images, reviews } = product;

  const { avgRating, totalRating } = calculateAvgRating(reviews);

  return (
    <div className="tour__card">
      <Card>
        <div className="tour__img">
          <img src={images} alt="tour-img" style={{ height: "250px" }} />
        </div>

        <CardBody>
          <div className="card__top d-flex align-items-center justify-content-between">
            <span className="tour__location d-flex align-items-center gap-1">
              {description.substring(0, 20)}
            </span>
            <span className="tour__rating d-flex align-items-center gap-1">
              <i className="ri-star-fill"></i>{" "}
              {avgRating === 0 ? null : avgRating}{" "}
              {totalRating === 0 ? (
                "Not rated"
              ) : (
                <span>({reviews.length})</span>
              )}
            </span>
          </div>

          <h5 className="tour__title">
            <Link to={`/products/${_id}`}>{title}</Link>
          </h5>
          <div className="card__bottom d-flex align-items-center justify-content-between ">
            <h5>${price} </h5>

            <button className="btn booking__btn">
              {" "}
              <Link to={`/products/${_id}`}>Buy Now</Link>
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProductCard;
