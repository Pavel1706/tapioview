import { ChangeEvent, useState } from "react";
import { addNewPostTC } from "../Posts/posts-reduser";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useAppDispatch } from "../store";
import styles from "./AddItemForm.module.css";


export function AddItemForm() {
    const dispatch = useAppDispatch()
    const [title, setTitle] = useState('')
    const [post, setPost] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (title.trim() !== '' && post.trim() !== '') {
            addItem(title, post);
            setTitle('');
            setPost('');
            setError(null)
        } else {
            setError('Title is required');
        }
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onChangePost = (e: ChangeEvent<HTMLInputElement>) => {
        setPost(e.currentTarget.value)
    }

    const addItem = (title: string, body: string) => {
        // @ts-ignore
        dispatch(addNewPostTC(title, body))
    }


    return <div className={styles.main}>
        <Box
            sx={{
                width: 300,
                maxWidth: '100%',
                margin: '10px'
            }}
        >
            <TextField fullWidth label="Title"
                       value={title}
                       id="fullWidth"
                       style={{ margin: '15px' }}
                       onChange={onChangeTitle}
                       error={!!error}
                       helperText={error}
            />
            <TextField fullWidth label="Post"
                       value={post}
                       error={!!error}
                       id="post"
                       style={{ margin: '15px' }}
                       onChange={onChangePost}
                       helperText={error}
            />
        </Box>
        <Button variant="contained" onClick={addItemHandler} endIcon={<SendIcon/>}>
            Send
        </Button>
    </div>
}
