import React, {ChangeEvent, useState} from "react";
import style from './addItem.module.scss';
import CustomButton from "../customButton/customButton";

export type AddItemPropsType = {
    placeholder?: string,
    addItemHandler: (title: string) => void,
}

const AddItem: React.FC<AddItemPropsType> = ({placeholder, addItemHandler}) => {

    const [title, changeTitle] = useState<string>('');

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        changeTitle(e.currentTarget.value)
    }

    const addNewItem = () => {
        if(title.trim().length) {
            addItemHandler(title);
            changeTitle('');
        }
    }

    const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.charCode === 13 && e.currentTarget.value.trim().length) {
            addNewItem();
        }
    }

    const onLooseFocus = (e: React.FocusEvent<HTMLInputElement>) => {
       addNewItem();
    }

    return(
        <div className={style.editable_span_wrapper}>
            <input type="text"
                   placeholder={placeholder}
                   value={title}
                   onChange={onChangeTitle}
                   onBlur={onLooseFocus}
                   onKeyPress={onEnterPress}
            />
            <CustomButton title={'+'} buttonHandler={addNewItem}/>
        </div>
    )
}

export default AddItem;