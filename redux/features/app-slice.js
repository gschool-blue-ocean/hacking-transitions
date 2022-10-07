import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allUsersData: [],
  allCohortsData: [],
  loginState: false,
  currentUser: {},
  activeStudent:{},
  cohortChat: []
};

export const appSlice = createSlice({
  name: "app-slice",
  initialState,
  reducers: {
    setAllUserData(state, { payload }) {
      state.allUsersData = payload;
    },
    setAllCohortData(state, { payload }) {
      state.allCohortsData = payload;
    },
    setLoginState(state, { payload }) {
      state.loginState = payload;
    },
    setCurrentUser(state, { payload }) {
      state.currentUser = payload;
    },
    setActiveStudent(state, { payload }) {
      state.activeStudent = payload;
    },
    setStudentsForCohortChat(state, {payload}) {
      state.cohortChat = payload;

    }
  },
});

export const {
  setAllUserData,
  setAllCohortData,
  setLoginState,
  setCurrentUser,
  setActiveStudent,
  setStudentsForCohortChat
} = appSlice.actions;
export default appSlice.reducer;
