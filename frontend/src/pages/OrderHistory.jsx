import { useEffect, useState } from "react";

import CartItem from "../components/Cart/CartItem";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/config";

const CartContainer = () => {
  const [products, setProducts] = useState([]);
  const { items } = products;
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const getOrderHistory = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/cart/orderHistory`, {
      headers: {
        Authorization: `Bearer ${JSON.stringify(token)}`,
      },
    });
    const result = await response.json();
    setProducts(result.data);
  };

  useEffect(() => {
    if (user) {
      getOrderHistory();
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="cart">
      <header>
        <h2>your order history</h2>
      </header>
      <div>
        {items &&
          items.map((item) => {
            return <CartItem key={item.product._id} item={item} />;
          })}
      </div>
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>${products.total}</span>
          </h4>
        </div>
        <button
          className=" primary__btn w-100 mt-4"
          onClick={() => navigate("/home")}
        >
          Back to home
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;
