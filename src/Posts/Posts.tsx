import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPostTC, deletePostTC, getPostsTC, PostType, updatePostTC } from "./posts-reduser";
import { AppRootStateType } from "../store";
import styles from './Posts.module.css'
import { Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { EditableSpan } from "../EditableSpan";

function Posts() {
    const [input, setInput] = useState('')
    const [title, setTitle] = useState('')
    // const [body, setBody] = useState('')
    const [post, setPost] = useState('')
    const [error, setError] = useState<string | null>(null)

    const posts = useSelector<AppRootStateType, Array<PostType>>((store) => store.posts)
    const dispatch = useDispatch()

    useEffect(() => {
        // @ts-ignore
        dispatch(getPostsTC())
    }, [])

    const addItemHandler = () => {
            if (input.trim() !== '' && post.trim() !== '') {
                addItem(input, post);
                setInput('');
            } else {
                setError('Title is required');
            }
        }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.currentTarget.value)
    }
    const onChangePost = (e: ChangeEvent<HTMLInputElement>) => {
        setPost(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.charCode === 13) {
            addItemHandler();
        }
    }

    const addItem = (title: string, body: string) => {
        // @ts-ignore
        dispatch(addNewPostTC(title, body))
    }
    const deletePost = (id: number) => {
        // @ts-ignore
        dispatch(deletePostTC(id))
    }



    return (
        <div>
            <h1> Posts</h1>
            <p> Do you want to create new post?</p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box
                    sx={{
                        width: 300,
                        maxWidth: '100%',
                        margin: '10px'
                    }}
                >
                    <TextField fullWidth label="title"
                               id="fullWidth"
                               style={{ margin: '15px' }}
                               onChange={onChangeTitle}
                               onKeyPress={onKeyPressHandler}
                               error={!!error}
                               helperText={error}
                    />
                    <TextField fullWidth label="post"
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
            <div className={styles.block}>
                {posts.map((post, index) => {


                    return (<div key={index} className={styles.main}>

                            <span className={styles.id}>{post.id}</span>
                            {/*<EditableSpan*/}
                            {/*            value={post.id}*/}
                            {/*              title={title}*/}
                            {/*            body={body}*/}
                            {/*              onChange={onTitleChangeHandler}/>*/}
                            {/*<span className={styles.title}>{post.title}</span>*/}
                            <EditableSpan value={post.title}
                                          id={post.id}
                                          // onChange={onTitleChangeHandler}
                            />
                            <span className={styles.description}>{post.body}</span>
                            {/*<EditableSpan value={post.body}*/}
                            {/*              onChange={() => onBodyChangeHandler}/>*/}
                            <IconButton  aria-label="delete" onClick={() => deletePost(post.id)} size="small">
                                <DeleteIcon  fontSize="small"/>
                            </IconButton>
                        </div>
                    )
                })}

            </div>
        </div>
    );
}

export default Posts
