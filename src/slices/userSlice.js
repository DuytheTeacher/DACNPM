import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    type: null,
  },
  reducers: {
    setUser: (state, action) => {
      const { user } = action.payload;

      state.user = user;
      state.type = user.userType;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
