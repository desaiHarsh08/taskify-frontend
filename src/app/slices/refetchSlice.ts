import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';

export interface RefetchState {
    refetchflag: boolean
}

const initialState: RefetchState = {
    refetchflag: false,
}

export const refetchSlice = createSlice({
    name: 'refetch',
    initialState,
    reducers: {
        toggleRefetch: (state) => {
            state.refetchflag = !state.refetchflag;
        },
    },
})

// Action creators are generated for each case reducer function
export const { toggleRefetch } = refetchSlice.actions

export const selectRefetch = ((state: RootState) => state.refetch.refetchflag);

export default refetchSlice.reducer