import { configureStore } from '@reduxjs/toolkit'
import loadingReducer from '@/app/slices/loadingSlice'
import refetchReducer from '@/app/slices/refetchSlice'
import taskTemplatesReducer from '@/app/slices/taskTemplatesSlice'


export const store = configureStore({
    reducer: {
        loading: loadingReducer,
        refetch: refetchReducer,
        taskTemplates: taskTemplatesReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch