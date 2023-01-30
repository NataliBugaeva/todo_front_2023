import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {v1} from "uuid";


//тип фильтра тудулиста
export type TodolistFilterType = 'all' | 'completed' | 'new';
//тип обьекта тудулиста
export type TodoItemType = {
    id: string,
    title: string,
    filter: TodolistFilterType
}

export type TodolistInitialStateType = {
    todos: Array<TodoItemType>
}

const initialState: TodolistInitialStateType = {
    todos: []
}

const todolistSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addNewTodolist(state, action: PayloadAction<{todoId: string, title: string}>) {
            state.todos.unshift({id: action.payload.todoId, title: action.payload.title, filter: 'all' as const});
        },
        removeTodolist(state, action: PayloadAction<{todoId: string}>) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.todoId);
        },
        changeTodoTitle(state, action: PayloadAction<{ todoId: string, todoTitle: string }>) {
            let searchTodo= state.todos.find(todo => todo.id === action.payload.todoId);
            if (searchTodo) {
                searchTodo.title = action.payload.todoTitle;
            }
        },

    }
})

export const {addNewTodolist, removeTodolist, changeTodoTitle} = todolistSlice.actions;
export default todolistSlice.reducer;
