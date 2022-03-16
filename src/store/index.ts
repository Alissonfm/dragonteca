import { configureStore } from '@reduxjs/toolkit'

import dragonReducer from './dragonStore'
import userReducer from './userStore'
import navigationReducer from './navStore'

const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    dragon: dragonReducer,
    user: userReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store