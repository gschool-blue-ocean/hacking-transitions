import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allUsersData: [],
  allCohortsData: [],
  loginState: false,
  currentUser: {},
  isAdmin: "",
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
      setLoginState(state, {payload}) {
        state.setLoginState = payload;
      },
      setCurrentUser(state, {payload}) {
        state.currentUser = payload;
      },
      setIsAdmin(state, {payload}) {
        state.isAdmin = payload;
      },
  },
});

export const {setAllUserData, setAllCohortData, setLoginState, setCurrentUser, setIsAdmin} = appSlice.actions
export default appSlice.reducer