import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addToCart, removeFromCart } from '../../utils/handleCart';
import { decreaseQty } from '../../utils/handleCart';

const url = "http://localhost:4000/cart";

const initialState = {
  cartItems: [],
  quantity:0,
  total: 0,
  isLoading: true
};

export const getCartItems = createAsyncThunk('cart/getCartItems', async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(url, {
      headers: {
        "content-type":"application/json",
        Authorization: `Bearer ${JSON.stringify(token)}`
      }
    });
    const result = await response.json()
    return result.cart;
  } catch (error) {
    throw new Error(error.message);
  }
});

const cartSlice = createSlice({
  name:'cart',
  initialState,
  
  reducers: {
      clearCart: (state) => {
          state.cartItems = [];
      },
      removeItem: (state, { payload }) => {
        removeFromCart(payload._id)
      },
      increase: (state, { payload }) => {
          addToCart(payload._id)
      },
      decrease: (state, { payload }) => {
        decreaseQty(payload._id)
      },
  },

  extraReducers: {
      [getCartItems.pending]: (state) => {
          state.isLoading = true;
      },
      [getCartItems.fulfilled]: (state, action) => {
          state.isLoading = false;
          state.cartItems = action.payload
          let total = 0;
          let quantity = 0;
          action.payload.forEach((item) => {

            const itemTotalPrice = item.product.price * item.quantity;
            total += itemTotalPrice;
          })
          state.total = total
      },
      [getCartItems.rejected]: (state) => {
          state.isLoading = false;
      }
  }
});

export const { clearCart, removeItem, increase, decrease } = cartSlice.actions;
export default cartSlice.reducer;