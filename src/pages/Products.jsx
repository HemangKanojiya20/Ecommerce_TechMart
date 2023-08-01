import React, { useState, useEffect } from "react";
import "../styles/product.css";

import CommonSection from "../shared/CommonSection";
import SearchBar from "../shared/SearchBar";
import ProductCard from "../shared/ProductCard";
import Newsletter from "../shared/Newsletter";

import { Col, Container, Row } from "reactstrap";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";

const Products = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");
  const [filtered, setFiltered] = useState([]);

  const {
    data: products,
    loading,
    error,
  } = useFetch(`${BASE_URL}/products?page=${page}`);
  const { data: productCount } = useFetch(
    `${BASE_URL}/products/search/getProductCount`
  );

  useEffect(() => {
    const pages = Math.ceil(productCount / 8);
    setPageCount(pages);
    window.scrollTo(0, 0);
  }, [page, productCount, products]);

  const filterProducts = (query) => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <>
      <CommonSection title={"All Products"} />

      <section>
        <Container>
          <Row>
            <SearchBar products={products} getData={setFiltered} />
            <div className="searchBar">
              <input
                type="text"
                placeholder="Search Product"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </Row>
        </Container>
      </section>

      <section className="pt-0">
        <Container>
          {loading && <h4 className="text-center pt-5">Loading...</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error && (
            <Row>
              {searchQuery &&
                filterProducts(searchQuery).map((product) => (
                  <Col lg="3" md="6" sm="6" className="mb-4" key={product._id}>
                    <ProductCard product={product} />
                  </Col>
                ))}
              {filtered.length > 0
                ? filtered.map((product) => (
                    <Col
                      lg="3"
                      md="6"
                      sm="6"
                      className="mb-4"
                      key={product._id}
                    >
                      <ProductCard product={product} />
                    </Col>
                  ))
                : products.map((product) => (
                    <Col
                      lg="3"
                      md="6"
                      sm="6"
                      className="mb-4"
                      key={product._id}
                    >
                      <ProductCard product={product} />
                    </Col>
                  ))}

              <Col lg="12">
                <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                  {[...Array(pageCount).keys()].map((number) => (
                    <span
                      key={number}
                      className={page === number ? "active__page" : ""}
                      onClick={() => setPage(number)}
                    >
                      {number + 1}
                    </span>
                  ))}
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

export default Products;
