import React, { useEffect, useState } from "react";
import "../styles/login.css";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";

import { loginUser, loginFailed } from "../features/user/userSlice";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/config";

import loginImg from "../assets/images/login.png";
import userIcon from "../assets/images/user.png";

const Login = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "post",
        mode: "cors",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      const result = await res.json();
      if (!res.ok) {
        toast.error(result.message);
        return;
      }

      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.data));
      dispatch(loginUser(result.data));
      toast.success(result.message);
      navigate("/");
    } catch (error) {
      dispatch(loginFailed(error.message));
    }
  };
  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={loginImg} alt="" />
              </div>

              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Login</h2>

                <Form onSubmit={handleSubmit}>
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
                    Login
                  </Button>
                </Form>
                <p>
                  Don't have an account ? <Link to="/register">Create</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
