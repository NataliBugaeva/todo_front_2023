import React, {ChangeEvent, useState} from "react";
import style from './editableSpan.module.scss';
import CustomButton from "../customButton/customButton";

export type EditableSpanPropsType = {
    title: string,
    changeTitleHandler: (title: string) => void,
    actionButtonHandler: () => void,
}

const EditableSpan: React.FC<EditableSpanPropsType> = ({title, changeTitleHandler, actionButtonHandler}) => {

    const [editMode, setEditMode] = React.useState<boolean>(false);
    const [inputText, setInputText] = useState<string>(title);

    const onChangeInputText = (e: ChangeEvent<HTMLInputElement>) => {
        setInputText(e.currentTarget.value);
    }

    const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
       if(e.charCode === 13 && e.currentTarget.value.trim().length) {
           changeTitleHandler(e.currentTarget.value.trim());
           setEditMode(false);
       }
    }

    const onLooseFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        if(e.currentTarget.value.trim().length) {
            changeTitleHandler(e.currentTarget.value.trim());
            setEditMode(false);
        }
    }

    return (
        editMode ?
            <>
                <input type="text"
                       autoFocus={true}
                       value={inputText}
                       onChange={onChangeInputText}
                       onKeyPress={onEnterPress}
                       onBlur={onLooseFocus}/>
            </>
            :
            <>
                <span className={style.task_title} onDoubleClick={() => setEditMode(!editMode)}>{title}</span>
                <CustomButton title={'x'} buttonHandler={actionButtonHandler}/>
            </>
    )
}

export default EditableSpan;