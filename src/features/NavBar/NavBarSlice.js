import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const getSearchResults = createAsyncThunk(
    'search/searchResults',
    async () => {
        const response = await fetch('reddit API');
        const data = await response.json();
        return data;
    }
)

const slice = createSlice({
    name: 'search',
    initialState: {
        searchTerm: '',
        searchResults: [],
        queryState: {
            isLoading: false,
            hasError: false
        }
    },
    reducers: {
        setSearchTerm: (state, action) => {
            state = action.payload;
        }
    },
    extraReducers: {
        [getSearchResults.pending]: (state, action) => {
            state.queryState.isLoading  = true;
            state.queryState.hasError   = false;
        },
        [getSearchResults.fulfilled]: (state, action) => {
            state.searchResults = action.payload.data.children;
        },
        [getSearchResults.rejected]: (state, action) => {
            state.queryState.isLoading  = false;
            state.queryState.hasError   = true;
        }
    }
});

export default slice.reducer;
export const { setSearchTerm } = slice.actions;
export const selectSearchTerm = state => state;