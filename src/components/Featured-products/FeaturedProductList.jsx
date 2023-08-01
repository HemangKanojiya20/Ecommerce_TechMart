import React from "react";
import ProductCard from "../../shared/ProductCard";
import { Col } from "reactstrap";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";

const FeaturedProductList = () => {
  const {
    data: featuredProducts,
    loading,
    error,
  } = useFetch(`${BASE_URL}/products`);

  return (
    <>
      {loading && <h4>Loading....</h4>}
      {error && <h4>{error}</h4>}
      {!loading &&
        !error &&
        featuredProducts.map((product) => (
          <Col lg={3} md="6" sm="6" key={product._id} className="mb-4">
            <ProductCard product={product} />
          </Col>
        ))}
    </>
  );
};

export default FeaturedProductList;
