import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from 'redux-thunk'
import { postsReducer } from "./Posts/posts-reduser";

const rootReducer = combineReducers({
    posts: postsReducer
})

export const store = createStore(rootReducer,applyMiddleware( thunkMiddleware))

export type AppRootStateType = ReturnType<typeof rootReducer>

