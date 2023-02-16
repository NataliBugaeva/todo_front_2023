import React, {useEffect} from 'react';
import './App.css';
import AddItem from "./features/addItem/addItem";
import {addTodo, getAllTodolists} from './features/todos/todoSlice';
import {useAppDispatch, useAppSelector} from "./app/hooks";
import Todolist from "./features/todos/todolist";
import {LoaderDots} from "@thumbtack/thumbprint-react";

function App() {
    const dispatch = useAppDispatch();
    const {todos, loading, error} = useAppSelector(state => state.todos);

    const addNewTodolist = (title: string) => {
        dispatch(addTodo(title))
    }

    useEffect(() => {
        console.log(`App rendering`)
        dispatch(getAllTodolists())
    }, [])

    return (
        error ? <div>{error}</div> :
            loading ? <LoaderDots/> :
                <div className="App">
                    <div style={{margin: '20px 0'}}><AddItem addItemHandler={addNewTodolist} placeholder={'add new todolist...'}/></div>
                    <div className={'todolists_wrapper'}>
                        {todos?.map((todolist, index) => <Todolist key={index} todo={todolist}/>)}
                    </div>
                    <div className={'footer'}>
                        <span>&#169; {new Date().getFullYear()} N.Bugaeva</span>
                    </div>
                </div>
    );
}

export default App;
