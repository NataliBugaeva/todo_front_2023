import React, {useCallback} from "react";
import style from './todolist.module.scss';
import AddItem from "../addItem/addItem";
import {deleteTodo, TodoItemType, TodolistFilterType, updateTodo} from "./todoSlice";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {addTask} from "../tasks/tasksSlice";
import Task from "../tasks/task";
import EditableSpan from "../editableSpan/editableSpan";

export type TodolistPropsType = {
    todo: TodoItemType,
}

const Todolist: React.FC<TodolistPropsType> = ({todo}) => {

    const dispatch = useAppDispatch();
    let allTasks = useAppSelector(state => state.tasks.tasks)
    const todoTasks = allTasks.filter(t => t.todo_id === todo.todo_id);

    const addNewTask = useCallback((title: string) => {
        dispatch(addTask({title, status: false, todo_id: todo.todo_id}))
    }, [todo.todo_id])

    const removeTodolist = useCallback(() => {
        dispatch(deleteTodo(todo.todo_id))
    }, [todo.todo_id])

    const onChangeTodolistTitle = useCallback((title: string) => {
        dispatch(updateTodo({todo_id: todo.todo_id, title, filter: todo.filter}))
    }, [todo.filter, todo.todo_id])

    const onChangeTodolistFilter = (filter: TodolistFilterType) => {
        dispatch(updateTodo({todo_id: todo.todo_id, title: todo.title, filter}))
    }

    return (
        <div className={style.todolist}>
            <div className={style.todolist_title}>
                <div>
                    <EditableSpan actionButtonHandler={removeTodolist} title={todo.title}
                                 changeTitleHandler={onChangeTodolistTitle}/>
                </div>
                <div style={{margin: '10px 0'}}>
                    <AddItem addItemHandler={addNewTask} placeholder={'add new task...'}/>
                </div>
            </div>
            <ul>
                {
                    todo.filter === 'new' ?
                        todoTasks?.filter((task, index) => !task.status).map((task, index) => <Task key={index}
                                                                                                    task={task}
                                                                                                    todoId={todo.todo_id}/>)
                        : todo.filter === 'completed' ?
                        todoTasks?.filter((task, index) => task.status).map((task, index) => <Task key={index}
                                                                                                   task={task}
                                                                                                   todoId={todo.todo_id}/>)
                        : todoTasks?.map((task, index) => <Task key={index} task={task} todoId={todo.todo_id}/>)
                }
            </ul>
            <div className={style.todolist_filter_buttons}>
                <div className={todo.filter === 'all' ? 'active_button' : ''}
                     onClick={() => onChangeTodolistFilter('all')}>All
                </div>
                <div className={todo.filter === 'new' ? 'active_button' : ''}
                     onClick={() => onChangeTodolistFilter('new')}>New
                </div>
                <div className={todo.filter === 'completed' ? 'active_button' : ''}
                     onClick={() => onChangeTodolistFilter('completed')}>Done
                </div>
            </div>
        </div>
    )
}

export default Todolist;

