import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
import todosReducer from '../features/todos/todoSlice';
import tasksReducer from '../features/tasks/tasksSlice';

export const store = configureStore({
    reducer: {
        todos: todosReducer,
        tasks: tasksReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;

