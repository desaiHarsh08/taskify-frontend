import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';

export interface LoadingState {
    visibility: boolean
}

const initialState: LoadingState = {
    visibility: false,
}

export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        toggleLoading: (state) => {
            state.visibility = !state.visibility;
        },
    },
})

// Action creators are generated for each case reducer function
export const { toggleLoading } = loadingSlice.actions

export const selectLoading = ((state: RootState) => state.loading.visibility);

export default loadingSlice.reducer