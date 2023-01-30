import React from "react";
import style from './task.module.scss';
import {TaskType, deleteTask, setTaskStatus, changeTaskTitle} from "./tasksSlice";
import {useAppDispatch} from "../../app/hooks";
import CustomButton from "../customButton/customButton";
import EditableSpan from "../editableSpan/editableSpan";

export type TaskPropsType = {
    task: TaskType,
    todoId: string,
}

const Task: React.FC<TaskPropsType> = ({task, todoId}) => {

    const dispatch = useAppDispatch();

    const toggleTaskStatus = () => {
        dispatch(setTaskStatus({todoId, taskId: task.id}))
    }

    const onRemoveTask = () => {
        dispatch(deleteTask({todoId, taskId: task.id}))
    }

    const onChangeTaskTitle = (title: string) => {
        dispatch(changeTaskTitle({todoId, taskId: task.id, taskTitle: title}))
    }

    return(
        <li className={style.task_wrapper}>
            <input className={style.task_input} type="checkbox" checked={task.completed} onChange={toggleTaskStatus}/>
            {/*эдесь эдитабле спан нужен*/}
            <EditableSpan title={task.title} actionButtonHandler={onRemoveTask} changeTitleHandler={onChangeTaskTitle}/>
            {/*<span className={style.task_title}>{task.title}</span>*/}
            {/*<CustomButton title={'x'} buttonHandler={onRemoveTask}/>*/}
        </li>
    )
}

export default Task;