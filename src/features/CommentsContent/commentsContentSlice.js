import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const basicURL = 'https://www.reddit.com';

export const getComments = createAsyncThunk(
    'commentsContent/getComments',
    async ({permalink, id}) => {
        console.log(permalink);
        //fetch pt comentarii
        const response = await fetch(basicURL + permalink.slice(0, permalink.length - 1) + '.json');
        const data = await response.json();
        console.log(data);
        return data;
    }
)

const slice = createSlice({
    name: 'commentsContent',
    initialState: {
        toggleView: {},
        commentDetails: {},
        loadingState: {}
    },
    reducers: {
        toggleView: (state, action) => {
            state.toggleView[action.payload] = state.toggleView[action.payload] ? !state.toggleView[action.payload] : true;
        }
    },
    extraReducers: {
        [getComments.pending]: (state, action) => {
            state.loadingState[action.meta.arg.id] = {
                isLoading: true,
                hasError: false
            }
        },
        [getComments.fulfilled]: (state, action) => {
            state.loadingState[action.meta.arg.id] = {
                isLoading: false,
                hasError: false
            }
            state.commentDetails[action.payload[0].data.children[0].data.id] = action.payload[1].data.children;
        },
        [getComments.rejected]: (state, action) => {
            state.loadingState[action.meta.arg.id] = {
                isLoading: false,
                hasError: true
            }
        }
    }
});

//exporting actions creators and reducer
export const {toggleView} = slice.actions;
export default slice.reducer;

//selectors Area
export const selectToggelView = state => state.commentsContent.toggleView;
