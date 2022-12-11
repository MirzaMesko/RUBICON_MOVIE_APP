import { configureStore } from '@reduxjs/toolkit';
// @ts-ignore
import reducer from './reducer.tsx';

export const store = configureStore({
    reducer: reducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
// eslint-disable-next-line no-undef
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

