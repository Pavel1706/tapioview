import { AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { postsReducer } from "./Posts/posts-reduser";
import { useDispatch } from "react-redux";

const rootReducer = combineReducers({
    posts: postsReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof store.getState>
type AppDispatch = ThunkDispatch<AppRootStateType,
    unknown,
    AnyAction>



export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppRootStateType,
    unknown,
    AnyAction
    >

export const useAppDispatch = () => useDispatch<AppDispatch>()



