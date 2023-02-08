import { postsAPI } from "../API/posts-api";
import { Dispatch } from "redux";


export type PostType = {
    userId: number
    id: number
    title: string
    body: string
}

const initialState: Array<PostType> = [];

export const postsReducer = (state: Array<PostType> = initialState, action: AllPostsReducerType) => {
    switch (action.type) {
        case 'GET-POSTS':
            return action.posts
        case 'ADD-POST':
            return [...state, { ...action.posts }]
        case 'DELETE-POST':
            return state.filter(post => post.id !== action.id)
        case 'UPDATE-POST':
            return state.map(post => post.id === action.id ? { ...post, title: action.title } : post)
        default:
            return state
    }
}


const getPostsAC = (posts: Array<PostType>) => {
    return {
        type: 'GET-POSTS',
        posts: posts,
    } as const
}

const addNewPostAC = (posts: Array<PostType>) => {
    return {
        type: 'ADD-POST',
        posts
    } as const
}
const deletePostAC = (id: number) => {
    return {
        type: 'DELETE-POST',
        id
    } as const
}
const updatePostAC = (id?: number, title?: string) => {
    return {
        type: 'UPDATE-POST',
        id,
        title
    } as const
}

export const getPostsTC = () => {
    return (dispatch: Dispatch) => {
        postsAPI.getPosts()
            .then((res) => {
                dispatch(getPostsAC(res.data))
            })
            .catch(error => {
                console.warn(error)
            })
    }
}

export const addNewPostTC = (title: string, body: string) => {
    return (dispatch: Dispatch) => {
        postsAPI.addPost(title, body)
            .then((res) => {
                dispatch(addNewPostAC(res.data))
            })
            .catch(error => {
                console.warn(error)
            })
    }
}
export const deletePostTC = (id: number) => {
    return (dispatch: Dispatch) => {
        postsAPI.deletePost(id)
            .then(() => {
                dispatch(deletePostAC(id))
            })
            .catch(error => {
                console.warn(error)
            })
    }
}
export const updatePostTC = (title: string, id: number) => {
    return (dispatch: Dispatch) => {
        postsAPI.updatePost(id!)
            .then(() => {
                dispatch(updatePostAC(id, title))
            })
            .catch(error => {
                console.warn(error)
            })
    }
}

type AllPostsReducerType =
    ReturnType<typeof getPostsAC>
    | ReturnType<typeof addNewPostAC>
    | ReturnType<typeof deletePostAC>
    | ReturnType<typeof updatePostAC>

