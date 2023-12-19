import { configureStore } from '@reduxjs/toolkit'
import reduxLinkSlice from './features/links/links'
import reduxSessionSlice from './features/session/session'
import reduxSidebarSlice from './features/sidebar/sidebar'
import reduxSelectItemSlice from './features/selectItem/selectItem'

export const store = configureStore({
  reducer: {
    links: reduxLinkSlice,
    session: reduxSessionSlice,
    sidebar: reduxSidebarSlice,
    selectItem: reduxSelectItemSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch