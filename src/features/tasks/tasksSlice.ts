import type {Reducer} from '@reduxjs/toolkit';
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {v1} from "uuid";
import {getAllTodolists, instance} from "../todos/todoSlice";


export type TaskType = {
    task_id: number,
    title: string,
    status: boolean,
    todo_id: number
}

export type TasksInitialStateType = {
    tasks: Array<TaskType>,
    loading: boolean,
    error: string | null
}

const initialState: TasksInitialStateType = {
    tasks: [],
    loading: false,
    error: ''
};

//асинхронные санки
//полученик всех тасок
export const getAllTasks = createAsyncThunk(
    "tasks/getTasks", async (_, thunkAPI) => {
        try {
            const response = await instance.get(`api/tasks`);//where you want to fetch data
            return  response.data.tasks;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    });

//добавление новой таски
export const addTask = createAsyncThunk(
    "tasks/addTask", async (body: {title: string, status: boolean, todo_id: number}, thunkAPI) => {
        try {
            const response = await instance.post(`api/tasks`, body);//where you want to fetch data
            return  response.data.task[0];
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    });

//удаление таски
export const deleteTask = createAsyncThunk(
    "tasks/deleteTask", async (task_id: number, thunkAPI) => {
        try {
            const response = await instance.delete(`api/tasks/${task_id}`);//where you want to fetch data
            return  response.data.taskId;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    });

//апдейт таски
export const updateTask = createAsyncThunk(
    "tasks/updateTask", async (body: {task_id: number, title: string, status: boolean}, thunkAPI) => {
        try {
            const response = await instance.put(`api/tasks/${body.task_id}`, {title: body.title, status: body.status});//where you want to fetch data
            return  response.data.task;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    });

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        // addNewTodolist(state, action: PayloadAction<{ todoId: number }>) {
        //     state.tasks[action.payload.todoId] = [];
        // },
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
           // delete state.tasks[action.payload.todoId];
            state.tasks.filter(t => t.todo_id !== action.payload.todoId)
        }
    },
    extraReducers: builder => {
        builder.addCase(getAllTasks.pending, (state) => {
            state.loading = true
        });
        builder.addCase(getAllTasks.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.tasks = payload;

        });
        builder.addCase(getAllTasks.rejected, (state, action) => {
           // state.loading = false;
            state.error = action.error.message || null;

        });

        builder.addCase(addTask.pending, (state) => {
            state.loading = true
        });
        builder.addCase(addTask.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.tasks.unshift(payload);

        });
        builder.addCase(addTask.rejected, (state, action) => {
            // state.loading = false;
            state.error = action.error.message || null;

        });

        builder.addCase(deleteTask.pending, (state) => {
            state.loading = true
        });
        builder.addCase(deleteTask.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.tasks = state.tasks.filter(t => t.task_id !== +payload);
        });
        builder.addCase(deleteTask.rejected, (state, action) => {
            // state.loading = false;
            state.error = action.error.message || null;

        });


        builder.addCase(updateTask.pending, (state) => {
            state.loading = true
        });
        builder.addCase(updateTask.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.tasks = state.tasks.map(t => t.task_id === payload.task_id ? {...payload} : t);
        });
        builder.addCase(updateTask.rejected, (state, action) => {
            // state.loading = false;
            state.error = action.error.message || null;

        });
    }

})

export const {removeAllTasksFromTodolist} = tasksSlice.actions;
export default tasksSlice.reducer;

// declare const reducer: Reducer<{}>;
//
// export default reducer;