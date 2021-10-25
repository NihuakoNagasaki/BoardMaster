import {configureStore} from '@reduxjs/toolkit'
import userList from '../features/taskList/userListSlice'

export const store = configureStore({
    reducer:{
        userList
    }
}) 

