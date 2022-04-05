import { createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
  name: "message",
  initialState: {
    content: "",
    type: "",
    isOpen: false,
  },
  reducers: {
    closeMessage: (state) => {
      state.isOpen = false;
    },
    errorMessage: (state, action) => {
      const { message } = action.payload;

      state.content = message;
      state.type = "error";
      state.isOpen = true;
    },
    successMessage: (state, action) => {
      const { message } = action.payload;

      state.content = message;
      state.type = "success";
      state.isOpen = true;
    },
  },
});

export const { closeMessage, errorMessage, successMessage } = messageSlice.actions;

export default messageSlice.reducer;
