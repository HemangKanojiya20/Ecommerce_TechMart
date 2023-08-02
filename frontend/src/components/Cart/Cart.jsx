import { useEffect, useState } from "react";
import CartItem from "./CartItem";
import "./Cart.css";

import { useSelector, useDispatch } from "react-redux";
import { getCartItems } from "../../features/cart/cartSlice";
import Checkout from "../../pages/Checkout";

const CartContainer = () => {
  const [checkout, setCheckout] = useState(false);
  const { cartItems, total } = useSelector((store) => store.cart);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getCartItems());
    }
    window.scrollTo(0, 0);
  }, []);

  if (cartItems.length === 0) {
    return (
      <section className="cart">
        <header>
          <h2>Your Bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }

  return (
    <section className="cart">
      <header>
        <h2>your bag</h2>
      </header>
      <div>
        {cartItems.map((item) => {
          return <CartItem key={item.product._id} item={item} />;
        })}
      </div>
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>${total}</span>
          </h4>
        </div>
        {!checkout ? (
          <button
            className="btn primary__btn w-100 mt-4"
            onClick={() => setCheckout(true)}
          >
            Checkout
          </button>
        ) : (
          <button
            className="btn primary__btn w-100 mt-4"
            onClick={() => setCheckout(false)}
          >
            Cancel checkout
          </button>
        )}
      </footer>

      {checkout && <Checkout total={total} />}
    </section>
  );
};

export default CartContainer;
