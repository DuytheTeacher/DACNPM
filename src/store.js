import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./slices/messageSlice";
import userReducer from "./slices/userSlice";

export default configureStore({
  reducer: {
    message: messageReducer,
    user: userReducer,
  },
});
