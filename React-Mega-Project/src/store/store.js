import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Path to your authSlice

const store = configureStore({
  reducer: { // Use "reducer" (singular) and an object for multiple reducers
    auth: authReducer, // Assign the authReducer to the "auth" key in the state
    // Add other reducers here if you have them:
    // otherReducer: otherReducer,
  },
});

export default store;