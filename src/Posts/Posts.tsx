import { useEffect } from "react";
import { useSelector } from "react-redux";
import { deletePostTC, getPostsTC, PostType } from "./posts-reduser";
import { AppRootStateType, useAppDispatch } from "../store";
import styles from './Posts.module.css'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { EditableSpan } from "../Components/EditableSpan";
import { AddItemForm } from "../Components/AddItemForm";

function Posts() {
    const dispatch = useAppDispatch()
    const posts = useSelector<AppRootStateType, Array<PostType>>((store) => store.posts)


    useEffect(() => {
        // @ts-ignore
        dispatch(getPostsTC())
    }, [])

    const deletePost = (id: number) => {
        // @ts-ignore
        dispatch(deletePostTC(id))
    }

    return (
        <div>
            <h1> Posts</h1>
            <p> Do you want to create new post?</p>
            <AddItemForm/>
            <div className={styles.block}>
                {posts.map((post, index) => {
                    return (<div key={index} className={styles.main}>
                            <span className={styles.id}>{post.id}</span>
                            <EditableSpan value={post.title}
                                          id={post.id}/>
                            <span className={styles.description}>{post.body}</span>
                            <IconButton aria-label="delete" onClick={() => deletePost(post.id)} size="small">
                                <DeleteIcon fontSize="small"/>
                            </IconButton>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Posts
