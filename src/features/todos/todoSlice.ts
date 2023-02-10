import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {v1} from "uuid";
import axios from "axios";

let instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});


export const getHeader = () => {

        return {
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type':  'application/json',
            }
        };

};

//тип фильтра тудулиста
export type TodolistFilterType = 'all' | 'completed' | 'new';
//тип обьекта тудулиста
export type TodoItemType = {
    id: string,
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
    loading: false,
    error: null
}

//асинхронные санки
//полученик всех тудулистов
export const getAllTodolists = createAsyncThunk(
    "todolists/getTodolists", async (_, thunkAPI) => {
       // debugger
        try {
            const response = await instance.get(`api/todolists`);//where you want to fetch data
            return  response.data.todos.map((t: any) => ({ id: t._id, title: t.title, filter: t.filter}));
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    });

//добавление тудулиста
export const addTodo = createAsyncThunk(
    "todolists/addTodolist",
    async (title: string, thunkAPI) => {
debugger
        try {
            const response =  instance.post(`api/todolists`, {title: title, filter: 'all'}, getHeader());//where you want to fetch data
          debugger
            //  return  response.data.todos.map((t: any) => ({ id: t._id, title: t.title, filter: t.filter}));
           // return response.data.todos
        } catch (error: any) {
            console.log(error)
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    });

const todolistSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        // addNewTodolist(state, action: PayloadAction<{todoId: string, title: string}>) {
        //     state.todos.unshift({id: action.payload.todoId, title: action.payload.title, filter: 'all' as const});
        // },
        // removeTodolist(state, action: PayloadAction<{todoId: string}>) {
        //     state.todos = state.todos.filter(todo => todo.id !== action.payload.todoId);
        // },
        // changeTodoTitle(state, action: PayloadAction<{ todoId: string, todoTitle: string }>) {
        //     let searchTodo= state.todos.find(todo => todo.id === action.payload.todoId);
        //     if (searchTodo) {
        //         searchTodo.title = action.payload.todoTitle;
        //     }
        // },

    },
    extraReducers: (builder) => {
        builder.addCase(getAllTodolists.pending, (state) => {
            state.loading = true
        });
        builder.addCase(getAllTodolists.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.todos = payload;
            debugger
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
            // state.todos = payload;
            debugger
        });
        builder.addCase(addTodo.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
    }
})

//export const {addNewTodolist, removeTodolist, changeTodoTitle} = todolistSlice.actions;
export default todolistSlice.reducer;
