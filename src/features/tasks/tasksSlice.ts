import type {Reducer} from '@reduxjs/toolkit';
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {v1} from "uuid";
import {instance} from "../todos/todoSlice";


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

//удаление всех тасок при удалении тудулиста
// export const deleteAllTasksFromTodo = createAsyncThunk(
//     "tasks/deleteAllTasksFromTodolist",
//     async (todoId: number, thunkAPI) => {
//         try {
//             instance.delete(`api/tasks/deleteAll/${todoId}`).then(res => {
//
//             })
//         }catch (error: any) {
//             console.log(error)
//             return thunkAPI.rejectWithValue({ error: error.message });
//         }
//     }
// )


const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addNewTodolist(state, action: PayloadAction<{ todoId: number }>) {
            state.tasks[action.payload.todoId] = [];
        },
        // addTask(state, action: PayloadAction<{ todoId: string, title: string }>) {
        //     state.tasks[action.payload.todoId].unshift({id: v1(), title: action.payload.title, completed: false})
        // },
        // setTaskStatus(state, action: PayloadAction<{ todoId: string, taskId: string }>) {
        //     let searchTask = state.tasks[action.payload.todoId].find(task => task.id === action.payload.taskId);
        //     if (searchTask) {
        //         searchTask.completed = !searchTask.completed;
        //     }
        // },
        // changeTaskTitle(state, action: PayloadAction<{ todoId: string, taskId: string, taskTitle: string }>) {
        //     let searchTask = state.tasks[action.payload.todoId].find(task => task.id === action.payload.taskId);
        //     if (searchTask) {
        //         searchTask.title = action.payload.taskTitle;
        //     }
        // },
        // deleteTask(state, action: PayloadAction<{ todoId: string, taskId: string }>) {
        //     state.tasks[action.payload.todoId] = state.tasks[action.payload.todoId].filter(task => task.id !== action.payload.taskId)
        // },
        removeAllTasksFromTodolist(state, action: PayloadAction<{ todoId: number }>) {
            delete state.tasks[action.payload.todoId];
        }
    }
})

export const {addNewTodolist, removeAllTasksFromTodolist} = tasksSlice.actions;
export default tasksSlice.reducer;

// declare const reducer: Reducer<{}>;
//
// export default reducer;