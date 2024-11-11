import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';
import TaskTemplate from '@/lib/task-template';

export interface TaskTemplateState {
    taskTemplates: TaskTemplate[]
}

const initialState: TaskTemplateState = {
    taskTemplates: [],
}

export const taskTemplatesSlice = createSlice({
    name: 'taskTemplates',
    initialState,
    reducers: {
        setTaskTemplates: (state, actions) => {
            console.log("in slice, actions:", actions);
            state.taskTemplates = actions.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setTaskTemplates } = taskTemplatesSlice.actions

export const selectTaskTemplates = ((state: RootState) => state.taskTemplates.taskTemplates);

export default taskTemplatesSlice.reducer