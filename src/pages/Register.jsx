import React, { useEffect, useState } from "react";
import "../styles/login.css";

import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";

import registerImg from "../assets/images/register.png";
import userIcon from "../assets/images/user.png";

import { BASE_URL } from "../utils/config";
import { toast } from "react-toastify";

const Register = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const result = await res.json();
      if (!res.ok) {
        return toast.warn(result.Message);
      }
      toast.success(result.Message);
      navigate("/login");
    } catch (error) {
      toast.error(error.Message);
    }
  };
  
  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={registerImg} alt="" />
              </div>

              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Register</h2>

                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Enter your username"
                      id="username"
                      required
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      id="email"
                      required
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      id="password"
                      required
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <Button
                    type="submit"
                    className="btn secondary__btn auth__btn"
                  >
                    Create Account
                  </Button>
                </Form>
                <p>
                  Already have an account ? <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;
