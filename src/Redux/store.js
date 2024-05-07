import { applyMiddleware, combineReducers, legacy_createStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { authReducer } from "./Auth/auth.reducer";
import { postReducer } from "./Post/post.reducer";
import { messageReducer } from "./message/message.reducer";

const rootReducers = combineReducers({
auth:authReducer,
post:postReducer,
message:messageReducer
})

export const store=legacy_createStore(rootReducers,applyMiddleware(thunk))

