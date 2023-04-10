import React, {ChangeEvent, memo, useEffect, useState} from "react";
import style from './editableSpan.module.scss';
import IconButton from "@mui/material/IconButton";
import ClearIcon from '@mui/icons-material/Clear';
import TextField from "@mui/material/TextField";

export type EditableSpanPropsType = {
    title: string,
    changeTitleHandler: (title: string) => void,
    actionButtonHandler: () => void,
}

const EditableSpan: React.FC<EditableSpanPropsType> = memo(function EditableSpan({title, changeTitleHandler, actionButtonHandler}) {

    const [editMode, setEditMode] = React.useState<boolean>(false);
    const [inputText, setInputText] = useState<string>(title);

    const onChangeInputText = (e: ChangeEvent<HTMLInputElement>) => {
        setInputText(e.currentTarget.value);
    }

    const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // @ts-ignore
        let val = e.target?.value;
        if (e.charCode === 13 && val.trim().length) {
            changeTitleHandler(val.trim());
            setEditMode(false);
        }
    }

    const onLooseFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.currentTarget.value.trim().length) {
            changeTitleHandler(e.currentTarget.value.trim());
            setEditMode(false);
        }
    }

    useEffect(() => {
        setInputText(title)
    }, [title])

    return (
        <div className={style.editable_span_wrapper}>
            {editMode ?
                <TextField autoFocus={true}
                           size={'small'}
                           variant="standard"
                           value={inputText}
                           onChange={onChangeInputText}
                           onBlur={onLooseFocus}
                           onKeyPress={onEnterPress}/>
                :
                <div className={style.editable_span_title_wrapper}>
                    <span className={style.task_title} onDoubleClick={() => setEditMode(!editMode)}>{inputText}</span>
                    <IconButton color={'primary'} onClick={actionButtonHandler}>
                        <ClearIcon/>
                    </IconButton>
                </div>
            }
        </div>
    )
})

export default EditableSpan;