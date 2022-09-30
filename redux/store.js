import { configureStore } from '@reduxjs/toolkit'
import appReducer from './features/app-slice'
 const store = configureStore({
  reducer: {
    app: appReducer,
    // Add the generated reducer as a specific top-level slice
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(),
})

export default store