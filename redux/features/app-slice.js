import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allUsersData: [],
  allCohortsData: [],
  loginState: false,
  currentUser: {},
  activeStudent:{},
  cohortChat: [],
  studentTasks: []
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
    setStudentTasks(state, { payload }) {
      state.studentTasks = payload;
    },
    setStudentsForCohortChat(state, {payload}) {
      state.cohortChat = payload;

    }
    deleteStudentTask(state, { payload }) {
      state.studentTasks = state.studentTasks.filter((task) => task.task_id !== payload.task_id)
    }
  },
});

export const {
  setAllUserData,
  setAllCohortData,
  setLoginState,
  setCurrentUser,
  setActiveStudent,
  setStudentTasks,
  setStudentsForCohortChat,
  deleteStudentTask
} = appSlice.actions;
export default appSlice.reducer;
