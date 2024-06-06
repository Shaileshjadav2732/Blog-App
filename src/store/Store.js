import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice'; // Import your authReducer or authSlice

const store = configureStore({
   reducer: {
      auth: authReducer // Add authReducer to the root reducer
   }
});

export default store;
