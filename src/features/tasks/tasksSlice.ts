import type {Reducer} from '@reduxjs/toolkit';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {v1} from "uuid";


export type TaskType = {
    id: string,
    title: string,
    completed: boolean,
}

export type TasksInitialStateType = {
    tasks: {
        [key: string]: Array<TaskType>
    }
}

const initialState: TasksInitialStateType = {
    tasks: {}
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addNewTodolist(state, action: PayloadAction<{ todoId: string }>) {
            state.tasks[action.payload.todoId] = [];
        },
        addTask(state, action: PayloadAction<{ todoId: string, title: string }>) {
            state.tasks[action.payload.todoId].unshift({id: v1(), title: action.payload.title, completed: false})
        },
        setTaskStatus(state, action: PayloadAction<{ todoId: string, taskId: string }>) {
            let searchTask = state.tasks[action.payload.todoId].find(task => task.id === action.payload.taskId);
            if (searchTask) {
                searchTask.completed = !searchTask.completed;
            }
        },
        changeTaskTitle(state, action: PayloadAction<{ todoId: string, taskId: string, taskTitle: string }>) {
            let searchTask = state.tasks[action.payload.todoId].find(task => task.id === action.payload.taskId);
            if (searchTask) {
                searchTask.title = action.payload.taskTitle;
            }
        },
        deleteTask(state, action: PayloadAction<{ todoId: string, taskId: string }>) {
            state.tasks[action.payload.todoId] = state.tasks[action.payload.todoId].filter(task => task.id !== action.payload.taskId)
        },
        removeTodolist(state, action: PayloadAction<{ todoId: string }>) {
            delete state.tasks[action.payload.todoId];
        }
    }
})

export const {addNewTodolist, addTask, setTaskStatus, deleteTask, removeTodolist, changeTaskTitle} = tasksSlice.actions;
export default tasksSlice.reducer;

// declare const reducer: Reducer<{}>;
//
// export default reducer;