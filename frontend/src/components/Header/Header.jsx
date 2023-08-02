import React, { useEffect, useRef } from "react";
import "./Header.css";

import { Container, Row, Button } from "reactstrap";
import { NavLink, Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../features/user/userSlice";
import { toast } from "react-toastify";

const nav__links = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/products",
    display: "Products",
  },
  {
    path: "/cart",
    display: "Cart",
  },
  {
    path: "/orderHistory",
    display: "Orders",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const logout = () => {
    dispatch(logoutUser());
    toast.success("Logout Successful");
  };

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();

    return window.removeEventListener("scroll", stickyHeaderFunc);
  });

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
            {/* --------------Logo------------- */}

            <div className="logo">
              <Link to={"/home"}>
                <h4
                  style={{
                    borderBottom: "3px solid #FAA935",
                    marginBottom: "0",
                  }}
                >
                  <span style={{ color: "#FAA935" }}>E </span>commerce
                </h4>
                <h6>Tech Mart</h6>
              </Link>
            </div>

            {/* --------------Navigation------------- */}

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <ul className="menu d-flex align-items-center gap-5">
                {nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "active__link" : " "
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* ---------------Other Buttons----------------- */}
            <div className="nav__right d-flex align-items-center gap-4">
              <div className="nav__btn d-flex align-items-center gap-4">
                {user ? (
                  <>
                    {" "}
                    <h5 className="mb-0" style={{ cursor: "pointer" }}>
                      {user.username}
                    </h5>{" "}
                    <Button className="btn btn-dark" onClick={logout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    {" "}
                    <Button className="btn secondary__btn">
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button className="btn primary__btn">
                      <Link to="/register">Register</Link>
                    </Button>
                  </>
                )}
              </div>

              <span className="mobile__menu" onClick={toggleMenu}>
                <i className="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
