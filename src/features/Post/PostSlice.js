import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const urlToFetch = 'https://www.reddit.com/r/';

export const loadPosts = createAsyncThunk(
    'posts/loadPosts',
    async (subreddit) => {
        const data = await fetch(urlToFetch + subreddit + '.json');
        const response = await data.json();
        return response;
    }
)

const slice = createSlice({
    name: 'posts',
    initialState: {
        loadingStatus: {
            isLoading: false,
            hasError: false,
        },
        postsData: []
    },
    reducers: {

    },
    extraReducers: {
        [loadPosts.pending]: (state, action) => {
            state.loadingStatus.isLoading = true;
            state.loadingStatus.hasError = false;
        },

        [loadPosts.fulfilled]: (state, action) => {
            state.loadingStatus.isLoading = false;
            state.loadingStatus.hasError = false;
            state.postsData = action.payload.data.children;
        },

        [loadPosts.rejected]: (state, action) => {
            state.loadingStatus.isLoading = false;
            state.loadingStatus.hasError = true;
        }
    }
});


export default slice.reducer;

export const selectPostsData = state => state.posts.postsData;
export const selectLoadingStatus = (state) => {
    if(state.posts.loadingStatus.isLoading && !state.posts.loadingStatus.hasError)
        return false;
    else{
        if(!state.posts.loadingStatus.isLoading && !state.posts.loadingStatus.hasError)
            return true;
        else
            return false;
    }
}
