import React, { useEffect, useRef, useState } from "react";
import "../styles/product-details.css";

import { Container, Row, Col, Form, ListGroup } from "reactstrap";

import { useParams } from "react-router-dom";
import calculateAvgRating from "../utils/avgRating";

import avatar from "../assets/images/avatar.jpg";
import Booking from "../components/Booking/Booking";
import Newsletter from "../shared/Newsletter";

import { BASE_URL } from "../utils/config";
import useFetch from "../hooks/useFetch";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();

  const reviewMsgRef = useRef("");
  const { user } = useSelector((state) => state.user);
  const [productRating, setProductRating] = useState(null);

  const {
    data: product,
    loading,
    error,
  } = useFetch(`${BASE_URL}/products/${id}`);

  const { images, reviews } = product;

  const { avgRating, totalRating } = calculateAvgRating(reviews);

  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const reviewText = reviewMsgRef.current.value;
    try {
      if (!user || user === undefined || user === null) {
        toast.warning("Please Login First");
        return;
      }
      const reviewObj = {
        username: user?.username,
        reviewText,
        rating: productRating,
      };
      const res = await fetch(`${BASE_URL}/review/${id}`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(reviewObj),
      });

      const result = await res.json();

      if (!res.ok) {
        return toast.error(result.message);
      }
      toast.success(result.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section>
        <Container>
          {loading && <h4 className="text-center pt-5">Loading...</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error && (
            <Row>
              <Col lg="8">
                <div className="tour__content">
                  <img src={images} alt="" />
                </div>
              </Col>

              <Col lg="4">
                <Booking
                  product={product}
                  totalRating={totalRating}
                  avgRating={avgRating}
                />
              </Col>

              <Col lg="8">
                <div className="tour__reviews mt-4">
                  <h4>Reviews ({reviews?.length} reviews)</h4>

                  <Form onSubmit={submitHandler}>
                    <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                      <span onClick={() => setProductRating(1)}>
                        1 <i className="ri-star-s-fill"></i>
                      </span>
                      <span onClick={() => setProductRating(2)}>
                        2 <i className="ri-star-s-fill"></i>
                      </span>
                      <span onClick={() => setProductRating(3)}>
                        3 <i className="ri-star-s-fill"></i>
                      </span>
                      <span onClick={() => setProductRating(4)}>
                        4 <i className="ri-star-s-fill"></i>
                      </span>
                      <span onClick={() => setProductRating(5)}>
                        5 <i className="ri-star-s-fill"></i>
                      </span>
                    </div>

                    <div className="review__input">
                      <input
                        type="text"
                        required
                        ref={reviewMsgRef}
                        placeholder="Share your thoughts"
                      />
                      <button
                        className="btn primary__btn text-white"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </Form>

                  <ListGroup className="user__reviews">
                    {reviews?.map((review) => (
                      <div className="review__item" key={review}>
                        <img src={avatar} alt="" />

                        <div className="w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <h5>{review.username}</h5>
                              <p>
                                {new Date(review.createdAt).toLocaleDateString(
                                  "en-US",
                                  options
                                )}
                              </p>
                            </div>
                            <span className="d-flex align-items-center">
                              {review.rating}
                              <i className="ri-star-s-fill"></i>
                            </span>
                          </div>
                          <h6>{review.reviewText}</h6>
                        </div>
                      </div>
                    ))}
                  </ListGroup>
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default ProductDetails;
