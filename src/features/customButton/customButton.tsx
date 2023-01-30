import React from "react";
import style from './customButton.module.scss';

export type CustomButtonPropsType = {
    buttonHandler: () => void,
    title: string
}

const CustomButton: React.FC<CustomButtonPropsType> = ({buttonHandler, title}) => {

    return(
        <button className={style.custom_button} onClick={buttonHandler}>{title}</button>
    )
}

export default CustomButton;