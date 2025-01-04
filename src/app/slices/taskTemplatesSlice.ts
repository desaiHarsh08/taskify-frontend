import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';
import TaskTemplate, { ColumnTemplate, FieldTemplate } from '@/lib/task-template';

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

            const tmpTaskTemplates = actions.payload as TaskTemplate[];

            for (let i = 0; i < tmpTaskTemplates.length; i++) {
                const fnTemplates = tmpTaskTemplates[i].functionTemplates;
                for (let j = 0; j < fnTemplates.length; j++) {
                    const fieldTemplates = fnTemplates[j].fieldTemplates;
                    for (let k = 0; k < fieldTemplates.length; k++) {
                        // Sort columnTemplates for each fieldTemplate
                        const sortedColumnTemplates = getSortedColumnTemplates(fieldTemplates[k]);
                        if (sortedColumnTemplates) {
                            fieldTemplates[k].columnTemplates = sortedColumnTemplates as ColumnTemplate[];
                        }
                    }
                }
            }

            // Update state with the sorted templates
            state.taskTemplates = tmpTaskTemplates;

        },
    },
})

const getSortedColumnTemplates = (fieldTemplate: FieldTemplate) => {
    console.log(fieldTemplate.columnSequences);
    console.log(fieldTemplate.columnTemplates);

    if (
        fieldTemplate.columnSequences &&
        fieldTemplate.columnSequences?.length > 0
    ) {
        console.log(
            fieldTemplate.columnTemplates.filter(
                (ele) =>
                    fieldTemplate.columnSequences?.find(
                        (seq) => seq.columnTemplateId === ele.id
                    ) === undefined
            )
        );
        // Sort the columnTemplates according to the sequence
        const sortedColumnTemplates = [];
        for (let i = 0; i <= fieldTemplate.columnSequences.length; i++) {
            const colSeq = fieldTemplate.columnSequences.find(
                (seq) => seq.sequence == i + 1
            );
            if (colSeq) {
                const colTemp = fieldTemplate.columnTemplates.find(
                    (colTemp) => colTemp.id == colSeq.columnTemplateId
                );
                sortedColumnTemplates.push(colTemp);
            }
        }
        console.log("sortedColumnTemplates:", sortedColumnTemplates);
        return sortedColumnTemplates;
    }

    return fieldTemplate.columnTemplates;
};

// Action creators are generated for each case reducer function
export const { setTaskTemplates } = taskTemplatesSlice.actions

export const selectTaskTemplates = ((state: RootState) => state.taskTemplates.taskTemplates);

export default taskTemplatesSlice.reducer