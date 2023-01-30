import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import AddItem from "./features/addItem/addItem";
import {addNewTodolist as addNewTodolistFromTodoSlice} from './features/todos/todoSlice';
import {addNewTodolist as addNewTodolistFromTaskSlice} from './features/tasks/tasksSlice';
import {useAppDispatch, useAppSelector} from "./app/hooks";
import {v1} from "uuid";
import Todolist from "./features/todos/todolist";

function App() {

    const dispatch = useAppDispatch();
    const todolists = useAppSelector(state => state.todos.todos);


    const addNewTodolist = (title: string) => {
        let todoId = v1();
        dispatch(addNewTodolistFromTodoSlice({todoId, title}));
        dispatch(addNewTodolistFromTaskSlice({todoId}));
    }


  return (
    <div className="App">
      <AddItem addItemHandler={addNewTodolist} placeholder={'add new todolist...'}/>
      <div className={'todolists_wrapper'}>
          {todolists.map((todolist, index) => <Todolist key={index} todo={todolist}/>)}
      </div>
    </div>
  );
}

export default App;
