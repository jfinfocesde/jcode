import { configureStore } from '@reduxjs/toolkit'
import reduxLeftSidebarLinkSlice from './features/leftSidebarLink/leftSidebarLink'
import reduxSessionSlice from './features/session/session'
import reduxRightSidebarSlice from './features/rightSidebar/rightSidebar'
import reduxSelectLinkSlice from './features/selectLink/selectLink'
import reduxProfileSlice from './features/profile/profile'

export const store = configureStore({
  reducer: {
    Session: reduxSessionSlice,
    LeftSidebarLink: reduxLeftSidebarLinkSlice,
    SelectLink: reduxSelectLinkSlice,
    RightSidebar: reduxRightSidebarSlice,
    Profile: reduxProfileSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch