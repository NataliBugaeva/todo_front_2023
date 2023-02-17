import React, {ChangeEvent, useState} from "react";
import style from './addItem.module.scss';
import CustomButton from "../customButton/customButton";
import Button from '@mui/material/Button';
import {Add} from "@mui/icons-material";
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import set = Reflect.set;

export type AddItemPropsType = {
    placeholder?: string,
    addItemHandler: (title: string) => void,
}

const AddItem: React.FC<AddItemPropsType> = ({placeholder, addItemHandler}) => {

    const [title, changeTitle] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
   // console.log(error);

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false);
        let newTitle = e.currentTarget.value;
        console.log(newTitle)
        newTitle.length <= 63 ? changeTitle(newTitle) : setError(true);
    }

    const addNewItem = () => {
        if(!error && title.trim().length) {
            addItemHandler(title);
            changeTitle('');
        }else if(!error && !title.trim().length) {
            setError(true)
        }
    }

    const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        let val = (e.target as HTMLInputElement).value;
        if (e.charCode === 13 && val.trim().length) {
            addNewItem();
        } else if(e.charCode === 13 && !val.trim().length) {
            setError(true)
        }
    }

    // const onLooseFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    //     addNewItem();
    // }

    return (
        <div className={style.editable_span_wrapper}>
            {/*<input type="text"*/}
            {/*       placeholder={placeholder}*/}
            {/*       value={title}*/}
            {/*       onChange={onChangeTitle}*/}
            {/*       onBlur={onLooseFocus}*/}
            {/*       onKeyPress={onEnterPress}*/}
            {/*/>*/}
        <TextField error={error}
                                 label={error ? "Error" : placeholder}
                                 size={'small'}
                                 variant="outlined"
                                 value={title}
                                 onChange={onChangeTitle}
                                 //onBlur={onLooseFocus}
                                 onKeyPress={onEnterPress}
                                 helperText={error && title.trim().length ? "The length must be less then 64" : error && !title.trim().length ? "This field cant be empty" : ''}
                />



            {/*<CustomButton title={'+'} buttonHandler={addNewItem}/>*/}
            <IconButton color={'primary'} onClick={addNewItem}>
                <AddBoxRoundedIcon/>
            </IconButton>
        </div>
    )
}

export default AddItem;