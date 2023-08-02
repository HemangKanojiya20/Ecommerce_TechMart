import { ChevronDown, ChevronUp } from "../../icons";
import { removeItem, increase, decrease } from "../../features/cart/cartSlice";
import { useDispatch } from "react-redux";

const CartItem = ({ item }) => {
  const { images, title, price, _id } = item.product;
  const dispatch = useDispatch();

  return (
    <article className="cart-item">
      <img src={images} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className="item-price">${price}</h4>
        <button
          className="remove-btn"
          onClick={() => {
            dispatch(removeItem({ _id }));
          }}
        >
          remove
        </button>
      </div>

      <div>
        <button
          className="amount-btn"
          onClick={() => {
            dispatch(increase({ _id }));
          }}
        >
          <ChevronUp />
        </button>

        <p className="amount">{item.quantity}</p>

        <button
          className="amount-btn"
          onClick={() => {
            if (item.quantity == 1) {
              dispatch(removeItem({ _id }));
              return;
            }
            dispatch(decrease({ _id }));
          }}
        >
          <ChevronDown />
        </button>
      </div>
    </article>
  );
};
export default CartItem;
