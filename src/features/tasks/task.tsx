import React, {useCallback} from "react";
import style from './task.module.scss';
import {deleteTask, TaskType, updateTask} from "./tasksSlice";
import {useAppDispatch} from "../../app/hooks";
import EditableSpan from "../editableSpan/editableSpan";

export type TaskPropsType = {
    task: TaskType,
    todoId: number,
}

const Task: React.FC<TaskPropsType> = ({task, todoId}) => {

    const dispatch = useAppDispatch();

    const toggleTaskStatus = useCallback((e: any) => {
        dispatch(updateTask({task_id: task.task_id, title: task.title, status: e.currentTarget.checked}))
    },[task.task_id, task.title])

    const onRemoveTask = useCallback(() => {
        dispatch(deleteTask(task.task_id))
    },[task.task_id])

    const onChangeTaskTitle = useCallback((title: string) => {
        dispatch(updateTask({task_id: task.task_id, title, status: task.status}))
    }, [task.task_id, task.status])

    return (
        <li className={style.task_wrapper}>
            <input className={style.task_input} type="checkbox" checked={task.status} onChange={toggleTaskStatus}/>
            <EditableSpan title={task.title} actionButtonHandler={onRemoveTask} changeTitleHandler={onChangeTaskTitle}/>
        </li>
    )
}

export default Task;