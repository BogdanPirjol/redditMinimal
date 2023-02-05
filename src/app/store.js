import { configureStore } from "@reduxjs/toolkit";
import subredditsSliceReducer from '../features/Subreddits/SubreditsSlice';
import postsSliceReducer from '../features/Post/PostSlice';
import commentsContentSliceReducer from '../features/CommentsContent/commentsContentSlice';

export const store = configureStore({
    reducer: {
        subreddits: subredditsSliceReducer,
        posts: postsSliceReducer,
        commentsContent: commentsContentSliceReducer
    }
})