import React, { useState } from "react";
import "../components/Booking/booking.css";

import { Form, FormGroup, Button } from "reactstrap";
import { BASE_URL } from "../utils/config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Checkout = ({ total }) => {
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState({
    fullName: "",
    address: "",
    phone: "",
    total,
  });

  const handleChange = (e) => {
    setPaymentDetails((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/cart/mock-payment`, {
      method: "post",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${JSON.stringify(token)}`,
      },
      body: JSON.stringify(paymentDetails),
    });

    const result = await response.json();
    toast.success(result.message);
  };

  return (
    <div className="booking__form">
      <h5>Basic Information</h5>

      <Form className="booking__info-form">
        <FormGroup>
          <input
            type="text"
            placeholder="Full name"
            id="fullName"
            required
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <input
            type="number"
            placeholder="Phone"
            id="phone"
            required
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <input
            type="text"
            placeholder="Enter your address"
            id="address"
            required
            onChange={handleChange}
          />
        </FormGroup>

        <Button
          className="btn primary__btn w-100 mt-4"
          onClick={() => {
            handleSubmit();
            navigate("/thank-you");
          }}
        >
          Buy Now
        </Button>
      </Form>
    </div>
  );
};

export default Checkout;
