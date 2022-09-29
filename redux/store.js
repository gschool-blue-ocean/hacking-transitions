import { configureStore } from '@reduxjs/toolkit'
 const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(),
})

export default store