import React from "react";
import style from './todolist.module.scss';
import AddItem from "../addItem/addItem";
import {TodoItemType, removeTodolist as removeTodolistFromTodoSlice, changeTodoTitle} from "./todoSlice";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import { addTask, removeTodolist as removeTodolistFromTaskSlice } from "../tasks/tasksSlice";
import Task from "../tasks/task";
import CustomButton from "../customButton/customButton";
import EditableSpan from "../editableSpan/editableSpan";

export type TodolistPropsType = {
    todo: TodoItemType,
}

const Todolist: React.FC<TodolistPropsType> = ({todo}) => {

    const dispatch = useAppDispatch();
    const todoTasks = useAppSelector(state => state.tasks.tasks[todo.id]);

    const addNewTask = (title: string) => {
        dispatch(addTask({todoId: todo.id, title}))
    }

    const removeTodolist = () => {
        dispatch(removeTodolistFromTodoSlice({todoId: todo.id}));
        dispatch(removeTodolistFromTaskSlice({todoId: todo.id}));
    }

    const onChangeTodolistTitle = (title: string) => {
        dispatch(changeTodoTitle({todoId: todo.id, todoTitle: title}))
    }

    return(
        <div className={style.todolist}>
            {/*здесь эдитабл спан нужен*/}
            <EditableSpan actionButtonHandler={removeTodolist} title={todo.title} changeTitleHandler={onChangeTodolistTitle}/>
            {/*<span className={style.todolist_title}>{todo.title}</span>*/}
            {/*<CustomButton buttonHandler={removeTodolist} title={'x'}/>*/}
            <div style={{margin: '10px 0'}}>
                <AddItem addItemHandler={addNewTask} placeholder={'add new task...'}/>
            </div>
            <ul>
                {todoTasks.map((task, index)=> <Task key={index} task={task} todoId={todo.id}/>)}
            </ul>

        </div>
    )
}

export default Todolist;