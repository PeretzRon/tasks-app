import {createSlice} from '@reduxjs/toolkit';


const initialAuthState = {
    loading: true,
    tasks: [],
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialAuthState,
    reducers: {
        replaceTasks(state, action) {
            state.tasks = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        replaceTask(state, action) {
            console.log('replaceTask');
            const {indexToUpdate, taskToUpdate} = action.payload;
            state.tasks[indexToUpdate] = taskToUpdate;
        },
        addTask(state, action) {
            state.tasks.push(action.payload);
        },
        deleteAllTasks(state) {
            state.tasks.length = 0;
        }
    },
});


export const tasksAction = tasksSlice.actions;

export default tasksSlice.reducer;
