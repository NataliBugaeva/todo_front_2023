import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {getAllTasks, removeAllTasksFromTodolist} from "../tasks/tasksSlice";

export let instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

export const getHeader = () => {
    return {
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json',
        }
    };
};


export type TodolistFilterType = 'all' | 'completed' | 'new';

export type TodoItemType = {
    todo_id: number,
    title: string,
    filter: TodolistFilterType
}

export type TodolistInitialStateType = {
    todos: Array<TodoItemType>,
    loading: boolean,
    error: string | null
}

const initialState: TodolistInitialStateType = {
    todos: [],
    loading: true,
    error: null
}

export const getAllTodolists = createAsyncThunk(
    "todolists/getTodolists", async (_, thunkAPI) => {
        try {
            const response = await instance.get(`api/todolists`);//where you want to fetch data
            response && thunkAPI.dispatch(getAllTasks());
            return response.data.todos;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.message});
        }
    });

export const addTodo = createAsyncThunk(
    "todolists/addTodolist",
    async (title: string, thunkAPI) => {
        try {
            const response = await instance.post(`api/todolists`, {title: title, filter: 'all'});//where you want to fetch data
            return response.data.todos[0]
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.message});
        }
    });

export const deleteTodo = createAsyncThunk(
    "todolists/deleteTodolist",
    async (todoId: number, thunkAPI) => {
        try {
            const response = await instance.delete(`api/todolists/${todoId}`);
            thunkAPI.dispatch(removeAllTasksFromTodolist({todoId: +response.data.todoId}))
            return +response.data.todoId;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.message});
        }
    }
)

export const updateTodo = createAsyncThunk(
    "todolists/updateTodolist",
    async (body: { todo_id: number, title: string, filter: TodolistFilterType }, thunkAPI) => {
        try {
            const response = await instance.put(`api/todolists/${body.todo_id}`, {
                title: body.title,
                filter: body.filter
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.message});
        }
    }
)

const todolistSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllTodolists.pending, (state) => {
            state.loading = true
        });
        builder.addCase(getAllTodolists.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.todos = payload;
        });
        builder.addCase(getAllTodolists.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });

        builder.addCase(addTodo.pending, (state) => {
            state.loading = true
        });
        builder.addCase(addTodo.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.todos = [...state.todos, payload];
        });
        builder.addCase(addTodo.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });

        builder.addCase(deleteTodo.pending, (state) => {
        });
        builder.addCase(deleteTodo.fulfilled, (state, {payload}) => {
            state.todos = state.todos.filter(t => t.todo_id !== +payload)
        });
        builder.addCase(deleteTodo.rejected, (state, action) => {
            state.error = action.error.message || null;
        });

        builder.addCase(updateTodo.pending, (state) => {
        });
        builder.addCase(updateTodo.fulfilled, (state, {payload}) => {
            if (payload.todo_id) {
                state.todos = state.todos.map(t => t.todo_id === +payload.todo_id ? {...payload} : t);
            }
        });
        builder.addCase(updateTodo.rejected, (state, action) => {
            state.error = action.error.message || null;
        });
    }
})

export default todolistSlice.reducer;
