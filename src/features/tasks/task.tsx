import React from "react";
import style from './task.module.scss';
// import {TaskType, deleteTask, setTaskStatus, changeTaskTitle} from "./tasksSlice";
import {deleteTask, TaskType, updateTask} from "./tasksSlice";
import {useAppDispatch} from "../../app/hooks";
import CustomButton from "../customButton/customButton";
import EditableSpan from "../editableSpan/editableSpan";

export type TaskPropsType = {
    task: TaskType,
    todoId: number,
}

const Task: React.FC<TaskPropsType> = ({task, todoId}) => {

    const dispatch = useAppDispatch();

    const toggleTaskStatus = (e: any) => {
        dispatch(updateTask({task_id: task.task_id, title: task.title, status: e.currentTarget.checked}))
    }

    const onRemoveTask = () => {
        dispatch(deleteTask(task.task_id))
    }

    const onChangeTaskTitle = (title: string) => {
        dispatch(updateTask({task_id: task.task_id, title, status: task.status}))
    }

    return(
        <li className={style.task_wrapper}>
            <input className={style.task_input} type="checkbox" checked={task.status} onChange={toggleTaskStatus}/>
            {/*эдесь эдитабле спан нужен*/}
            <EditableSpan title={task.title} actionButtonHandler={onRemoveTask} changeTitleHandler={onChangeTaskTitle}/>
            {/*<span className={style.task_title}>{task.title}</span>*/}
            {/*<CustomButton title={'x'} buttonHandler={onRemoveTask}/>*/}
        </li>
    )
}

export default Task;