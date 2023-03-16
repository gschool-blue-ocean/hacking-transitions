import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeStudent: {},
  studentTasks: [],
};

export const appSlice = createSlice({
  name: "app-slice",
  initialState,
  reducers: {
    setActiveStudent(state, { payload }) {
      state.activeStudent = payload;
      sessionStorage.setItem("activeStudent", JSON.stringify(payload));
    },
    setStudentTasks(state, { payload }) {
      state.studentTasks = payload;
    },
    deleteStudentTask(state, { payload }) {
      state.studentTasks = state.studentTasks.filter(
        (task) => task.task_id !== payload.task_id
      );
    },
  },
});

export const { setActiveStudent, setStudentTasks, deleteStudentTask } =
  appSlice.actions;
export default appSlice.reducer;
