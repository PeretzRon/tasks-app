import {configureStore} from '@reduxjs/toolkit';

import authReducer from './auth';
import tasks from "./tasks";


const store = configureStore({
    reducer: {auth: authReducer, tasks: tasks},
});

export default store;
