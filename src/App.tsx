import React, {useEffect} from 'react';
import logo from './logo.svg';
import {Counter} from './features/counter/Counter';
import './App.css';
import AddItem from "./features/addItem/addItem";
// import {addNewTodolist as addNewTodolistFromTodoSlice, getAllTodolists} from './features/todos/todoSlice';
// import {addNewTodolist as addNewTodolistFromTaskSlice} from './features/tasks/tasksSlice';
import {addTodo, getAllTodolists} from './features/todos/todoSlice';
import {useAppDispatch, useAppSelector} from "./app/hooks";
import {v1} from "uuid";
import Todolist from "./features/todos/todolist";
import {LoaderDots} from "@thumbtack/thumbprint-react";

function App() {

    const dispatch = useAppDispatch();
    const {todos, loading, error} = useAppSelector(state => state.todos);


    const addNewTodolist = (title: string) => {
        // let todoId = v1();
        // dispatch(addNewTodolistFromTodoSlice({todoId, title}));
        // dispatch(addNewTodolistFromTaskSlice({todoId}));
        dispatch(addTodo(title))
    }

    useEffect(() => {
        dispatch(getAllTodolists())
    }, [])

    return (
        error ? <div>{error}</div> :
            loading ? <LoaderDots/> :
                <div className="App">
                    <AddItem addItemHandler={addNewTodolist} placeholder={'add new todolist...'}/>
                    <div className={'todolists_wrapper'}>
                        {todos?.map((todolist, index) => <Todolist key={index} todo={todolist}/>)}
                    </div>
                </div>
    );
}

export default App;
