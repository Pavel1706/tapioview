import React, { ChangeEvent, useState } from 'react';
import TextField from '@mui/material/TextField';
import styles from './Posts/Posts.module.css'
import { updatePostTC } from "./Posts/posts-reduser";
import { useDispatch } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';

type EditableSpanPropsType = {
    value: string
    id: number
    // onChange: (newValue:string) => void
    // title?: string
    // body: string
}

export const EditableSpan = (props: EditableSpanPropsType) => {

    let [editMode, setEditMode] = useState(false);
    // let [id, setId] = useState(props.value);
    let [title, setTitle] = useState(props.value);
    // let [body, setBody] = useState(props.body);
    // let [id, setId] = useState(props.value);
    const dispatch = useDispatch()

    const onTitleChangeHandler = () => {
        setTitle(title)
        // @ts-ignore
        dispatch(updatePostTC(title, props.id))
    }

    const activateEditMode = () => {
        setEditMode(true);
        // setId(props.value);
        setTitle(props.value)
        // setBody(props.body)
    }
    const activateViewMode = () => {
        setEditMode(false);
        setTitle(title);
        onTitleChangeHandler()
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <TextField value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode}/>
        : <span className={styles.title} onDoubleClick={activateEditMode}>{props.value} <EditIcon
            onClick={() => setEditMode(true)}/></span>
};
