import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {v1} from "uuid";
import axios from "axios";
import {useAppDispatch} from "../../app/hooks";
import {getAllTasks, removeAllTasksFromTodolist} from "../tasks/tasksSlice";

export let instance = axios.create({
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
    loading: false,
    error: null
}

//асинхронные санки
//полученик всех тудулистов
export const getAllTodolists = createAsyncThunk(
    "todolists/getTodolists", async (_, thunkAPI) => {
        try {
            thunkAPI.dispatch(getAllTasks());
            const response = await instance.get(`api/todolists`);//where you want to fetch data
           // response.data?.todos.forEach((t: TodoItemType) => thunkAPI.dispatch(addNewTodolist({todoId: t.todo_id})))
            return  response.data.todos;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    });

//добавление тудулиста
export const addTodo = createAsyncThunk(
    "todolists/addTodolist",
    async (title: string, thunkAPI) => {
        try {
            const response =  await instance.post(`api/todolists`, {title: title, filter: 'all'});//where you want to fetch data
            //thunkAPI.dispatch(addNewTodolist({todoId:response.data.todos[0].todo_id}))
            return response.data.todos[0]
        } catch (error: any) {
            console.log(error)
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    });

//удаление тудулиста
export const deleteTodo = createAsyncThunk(

    "todolists/deleteTodolist",
    async (todoId: number, thunkAPI) => {
        try {
            const response =  await instance.delete(`api/todolists/${todoId}`);
                thunkAPI.dispatch(removeAllTasksFromTodolist({todoId: +response.data.todoId}))
                return response.data.todoId;
        }catch (error: any) {
            console.log(error)
            return  thunkAPI.rejectWithValue({ error: error.message });
        }
    }
)

//изменение наименования тудулиста
export const updateTodo = createAsyncThunk(

    "todolists/updateTodolist",
    async (body: {todo_id: number, title: string, filter: TodolistFilterType}, thunkAPI) => {
        try {
            const response = await instance.put(`api/todolists/${body.todo_id}`, {title: body.title, filter: body.filter});
            return response.data;
        }catch (error: any) {
            console.log(error)
            return  thunkAPI.rejectWithValue({ error: error.message });
        }
    }
)



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

        });
        builder.addCase(getAllTodolists.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;

        });

        builder.addCase(addTodo.pending, (state) => {
          //  state.loading = true
        });
        builder.addCase(addTodo.fulfilled, (state, {payload}) => {
           //  state.loading = false;
            state.todos.unshift(payload);

        });
        builder.addCase(addTodo.rejected, (state, action) => {
           // state.loading = false;
            state.error = action.error.message || null;
        });

        builder.addCase(deleteTodo.pending, (state) => {
           // state.loading = true
        });
        builder.addCase(deleteTodo.fulfilled, (state, {payload}) => {
           // state.loading = false;
            state.todos = state.todos.filter(t => t.todo_id !== +payload);
        });
        builder.addCase(deleteTodo.rejected, (state, action) => {
           // state.loading = false;
            state.error = action.error.message || null;
        });

        builder.addCase(updateTodo.pending, (state) => {
          //  state.loading = true
        });
        builder.addCase(updateTodo.fulfilled, (state, {payload}) => {
         //   state.loading = false;
            if(payload.todo_id) {
            state.todos = state.todos.map(t => t.todo_id === +payload.todo_id ? {...payload} : t);
            }

        });
        builder.addCase(updateTodo.rejected, (state, action) => {
          //  state.loading = false;
            state.error = action.error.message || null;
        });
    }
})

//export const {addNewTodolist, removeTodolist, changeTodoTitle} = todolistSlice.actions;
export default todolistSlice.reducer;
