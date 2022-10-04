import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allUsersData: [],
  allCohortsData: [],
};

export const appSlice = createSlice({
  name: "app-slice",
  initialState,
  reducers: {
    setAllUserData(state, {payload}) {
      state.allUsersData = payload;
    },
    setAllCohortData(state, {payload}) {
        state.allCohortsData = payload;
      },
  },
});

export const {setAllUserData, setAllCohortData} = appSlice.actions
export default appSlice.reducer