import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: localStorage.getItem('token')
  ? JSON.parse(localStorage.getItem('user'))
  : null,
  error:null,
  isLoggedIn: false,  
};


const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.error = null
    },
    loginFailed: (state, action) => {
      state.user = null;
      state.isLoggedIn = false;
      state.error = action.payload
    },
    logoutUser: (state) => {
      state.user = localStorage.removeItem("user");  localStorage.removeItem("token");
      state.isLoggedIn = false;
      state.error = null
    }, 
  },
});

export const { loginUser, logoutUser, loginFailed } = userSlice.actions;
export default userSlice.reducer;