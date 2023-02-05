import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const urlToFetch = 'https://www.reddit.com/subreddits.json';

export const loadData = createAsyncThunk(
    'subrredits/loadData',
    async () => {
        const data = await fetch(urlToFetch);
        const response = await data.json();
        return response;
    }
)

const slice = createSlice({
    name: 'subreddits',
    initialState: {
        isLoading: false,
        hasError: false,
        error: '',
        subreddits: [],
        activeSubreddit: 'pics', 
        activeSubredditId: ''
    },
    reducers:{
        setActiveSubreddit: (state, action) => {
            state.activeSubreddit = action.payload.subredditName;
            state.activeSubredditId = action.payload.subredditId;
        },
        setActiveSubredditId: (state, action) => {
            state.activeSubredditId = action.payload;
        }
    },
    extraReducers: {
        [loadData.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [loadData.fulfilled]: (state, action) => {
            state.hasError = false;
            state.isLoading = false;
            state.subreddits = action.payload.data.children;
        },
        [loadData.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
            state.error = action.payload;
        }
    }
});

export const selectSubreddits = state => state.subreddits;
export const selectActiveSubreddit = state => state.subreddits.activeSubreddit;
export const selectActiveId = state => state.subreddits.activeSubredditId;
export default slice.reducer;

export const { setActiveSubreddit, setActiveSubredditId } = slice.actions;