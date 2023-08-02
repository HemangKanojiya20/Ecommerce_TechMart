import React from "react";
import "./booking.css";

import { Button } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { addToCart } from "../../utils/handleCart";
import { toast } from "react-toastify";

const Booking = ({ product, avgRating, totalRating }) => {
  const { price, reviews, title } = product;

  const { user } = useSelector((store) => store.user);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    if (!user || user === undefined || user === null) {
      toast.warning("Please login first");
      navigate("/login");
      return;
    }

    addToCart(id);
  };

  return (
    <div className="booking">
      <div className="tour__info">
        <h2>{title}</h2>

        <div className="d-flex align-items-center gap-5">
          <span className="tour__rating d-flex align-items-center gap-1">
            <i
              className="ri-star-fill"
              style={{ color: "var(--secondary-color)" }}
            ></i>{" "}
            {avgRating === 0 ? null : avgRating}{" "}
            {totalRating === 0 ? "Not rated" : <span>({reviews?.length})</span>}
          </span>
        </div>

        <div className="tour__extra-details">
          <span>
            <i className="ri-money-dollar-circle-line"></i> {price}
          </span>
        </div>
        <h5>Description</h5>
        <p>{product.description}</p>
      </div>

      <div className="booking__bottom">
        <Button
          className="btn primary__btn w-100 mt-4"
          onClick={() => handleSubmit()}
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default Booking;
