import React, { useState } from "react";
import { Col, Form, FormGroup } from "reactstrap";
import "./search-bar.css";

const SearchBar = ({ products, getData }) => {
  const [error, setError] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");

  const allCategories = [
    ...new Set(products.map((product) => product.category)),
  ];

  const getProductsByCategory = (category) => {
    return category === "All"
      ? products
      : products.filter((product) => product.category === category);
  };

  const getPriceRangeArray = (priceRangeString) => {
    if (priceRangeString === "All") {
      return [0, Number.MAX_SAFE_INTEGER];
    }

    const [minPrice, maxPrice] = priceRangeString.split("-").map(Number);
    return [minPrice, maxPrice];
  };

  const filterProducts = (category, priceRange) => {
    const productsByCategory = getProductsByCategory(category);

    return productsByCategory.filter((product) => {
      const priceMatch =
        priceRange === "All"
          ? true
          : product.price >= getPriceRangeArray(priceRange)[0] &&
            product.price <= getPriceRangeArray(priceRange)[1];

      return priceMatch;
    });
  };

  const handleFilterClick = () => {
    const filteredProducts = filterProducts(
      selectedCategory,
      selectedPriceRange
    );
    getData(filteredProducts);
  };

  return (
    <Col lg="12">
      <div className="search__bar">
        <Form className="d-flex align-items-center gap-4">
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              {allCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </FormGroup>

          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <select
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
            >
              <option value="All">All Prices</option>
              <option value="0-50">$0 - $50</option>
              <option value="51-100">$51 - $100</option>
              <option value="101-1000">$101 - $1000</option>
              <option value="1000-2000">$1000 - $2000</option>
            </select>
          </FormGroup>

          <span
            className="search__icon"
            type="submit"
            onClick={handleFilterClick}
          >
            <i className="ri-search-line"></i>
          </span>
        </Form>

        <span
          style={{
            color: "red",
            marginLeft: "40px",
            marginBottom: "0",
            display: error ? "block" : "none",
          }}
        >
          {error}
        </span>
      </div>
    </Col>
  );
};

export default SearchBar;
