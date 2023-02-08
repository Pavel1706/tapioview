import axios from "axios";
import { PostType } from "../Posts/posts-reduser";

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
})

export const postsAPI = {
    getPosts(){
        return instance.get<Array<PostType>>('posts')
    },
    addPost(title:string, body: string){
        return instance.post('posts', {title, body})
    },
    deletePost(id:number){
        return instance.delete(`posts/${id}` )
    },
    updatePost(id?: number, title?:string, body?:string){
        return instance.put(`posts/${id}`, {title, body})
    }
}
