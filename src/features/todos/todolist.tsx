import React from "react";
import style from './todolist.module.scss';
import AddItem from "../addItem/addItem";
//import {TodoItemType, removeTodolist as removeTodolistFromTodoSlice, changeTodoTitle} from "./todoSlice";
import {deleteTodo, TodoItemType, TodolistFilterType, updateTodo} from "./todoSlice";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
//import { addTask, removeTodolist as removeTodolistFromTaskSlice } from "../tasks/tasksSlice";
import Task from "../tasks/task";
import CustomButton from "../customButton/customButton";
import EditableSpan from "../editableSpan/editableSpan";

export type TodolistPropsType = {
    todo: TodoItemType,
}

const Todolist: React.FC<TodolistPropsType> = ({todo}) => {

    const dispatch = useAppDispatch();
    const todoTasks = useAppSelector(state => state.tasks.tasks[todo.todo_id]);

    const addNewTask = (title: string) => {
       // dispatch(addTask({todoId: todo.id, title}))
    }

    const removeTodolist = (todoId: number) => {
        dispatch(deleteTodo(todoId))
    }

    const onChangeTodolistTitle = (title: string) => {
        dispatch(updateTodo({todo_id: todo.todo_id, title, filter: todo.filter}))
    }

    const onChangeTodolistFilter = (filter: TodolistFilterType) => {
        dispatch(updateTodo({todo_id: todo.todo_id, title: todo.title, filter}))
    }

    return(
        <div className={style.todolist}>
            {/*здесь эдитабл спан нужен*/}
            <div><EditableSpan actionButtonHandler={() => removeTodolist(todo.todo_id)} title={todo.title}
                             changeTitleHandler={onChangeTodolistTitle}/>
                {/*<span className={style.todolist_title}>{todo.title}</span>*/}
                {/*<CustomButton buttonHandler={removeTodolist} title={'x'}/>*/}
                <div style={{margin: '10px 0'}}>
                    <AddItem addItemHandler={addNewTask} placeholder={'add new task...'}/>
                </div>
            </div>
            <ul>
                {todoTasks?.map((task, index)=> <Task key={index} task={task} todoId={todo.todo_id}/>)}
            </ul>
            <div className={style.todolist_filter_buttons}>
                <div className={todo.filter === 'all' ? 'active_button' : ''} onClick={() => onChangeTodolistFilter('all')}>All</div>
                <div className={todo.filter === 'new' ? 'active_button' : ''} onClick={() => onChangeTodolistFilter('new')}>New</div>
                <div className={todo.filter === 'completed' ? 'active_button' : ''} onClick={() => onChangeTodolistFilter('completed')}>Done</div>
            </div>

        </div>
    )
}

export default Todolist;