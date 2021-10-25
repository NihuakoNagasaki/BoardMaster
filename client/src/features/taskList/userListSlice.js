import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await fetch('http://localhost:3000/api/taskManager')

    return response.json()
})

export const userListSlice = createSlice({
    name: 'userList',
    initialState: {
        // users: [],
        // status: '',
        error: null,
        userName: '',
        userSurname: '',
        email: '',
        userpassword: '',
        loggedIn: null,
        userAreaList: null
    },
    reducers: {
        usersGotten(state, action) {
            return [...action.payload]
        },
        usersEmailGotten(state, action) {
            state.loggedIn = action.payload
        },
        usersAreaGotten(state, action) {
            state.userAreaList = action.payload
        },
        usersAdded(state, action) {
            return(action.payload)
        },
        areaAdded(state, action) {
            return(action.payload)
        },
        tasksCheckSend(state, action) {
            return [...action.payload]
        },
        cookiesSet(state, action) {
            console.log(action.payload);
            state.loggedIn = action.payload
        },
        userChange(state, action) {
            return [...action.payload]
        },
        taskUpdate(state, action) {
            let task = state.tasks.find(item => item.id == action.payload.id)
            task.check = !task.check
        },
        taskDelete(state, action) {
            let arr = state.tasks.filter(el => el.id !== action.payload)
            state.tasks = arr
        }
    },
    extraReducers: {
        [fetchPosts.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchPosts.fulfilled]: (state, action) => {

            state.status = 'succeeded'
            state.users = state.users.concat(action.payload)
        },
        [fetchPosts.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        }
    }
})

export default userListSlice.reducer
export const { usersGotten, usersEmailGotten, cookiesSet, usersAreaGotten, areaAdded, userChange, usersAdded, taskUpdate, taskDelete } = userListSlice.actions






export function usersFetch() {
    return async function (dispatch) {
        let response = await fetch('http://localhost:3000/api/taskManager')
        if (response.ok) {
            let taskList = await response.json()
            dispatch(usersGotten(taskList))
        }
    }
}

export function setCookies(cookie) {
    return async function (dispatch) {
        
            dispatch(cookiesSet(cookie))
        
    }
}


// export function getCookies() {
//     return async function (dispatch) {
//         let response = await fetch('http://localhost:3000/api/getcookies')
//         console.log('12345');
//         if (response.ok) {
//             let userCookie = await response.json()
//             console.log(userCookie);
//             dispatch(cookiesGotten(userCookie))
//         }
//     }
// }


export function userFindEmail(usermail, userpass) {
    return async function (dispatch) {
        // usermail = 'igor.ilji@gw
        let response = await fetch(`http://localhost:3000/api/userLog/${usermail}/${userpass}`)
        if (response.ok) {
            let user = await response.json()
            console.log(user);
            dispatch(usersEmailGotten(user))
        }
    }
}

export function userFindArea(userid) {
    return async function (dispatch) {
        // usermail = 'igor.ilji@gw
        let response = await fetch(`http://localhost:3000/api/areaGet/${userid}`)
        if (response.ok) {
            let areas = await response.json()
            console.log(areas);
            dispatch(usersAreaGotten(areas))
        }
    }
}

export function taskCheck(props) {
    return async function (dispatch, getState) {
        const state = getState()

        let response = await fetch(`http://localhost:3000/api/taskManager/${props.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                check: !(state.taskList.tasks.find(task => props.id == task.id).check)
            })
        })
        if (response.ok) {
            dispatch(taskUpdate(props))
        }
    }

}

export function userAddToList(userName, userSurname, email, userpassword) {
    return async function (dispatch) {
        let response = await fetch('http://localhost:3000/api/taskManager', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: userName,
                surname: userSurname,
                email: email,
                pass: userpassword
            })
        })
        if (response.ok) {
            console.log(response);
            dispatch(usersAdded(await response.json()))
        }
        else {
            console.log(response);
        }
    }
}

export function areaAddToList(name, description, user_id) {
    return async function (dispatch) {
        let response = await fetch('http://localhost:3000/api/areaadd', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                description: description,
                user_id: user_id               
            })
        })
        if (response.ok) {
            console.log(response);
            dispatch(areaAdded(await response.json()))
        }
        else {
            console.log(response);
        }
    }
}


export function taskDeleteFunction(id) {

    return async function (dispatch) {
        let response = await fetch(`http://localhost:3000/api/taskManager/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }

        })
        dispatch(taskDelete(id))
    }
}
