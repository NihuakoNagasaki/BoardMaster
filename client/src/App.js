// @ts-check

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
// import { userListSlice, userFindArea, setCookies, userFindEmail } from "./features/taskList/userListSlice";
import UserList from "./components/userLog";
import RegForm from "./components/userAdd";
import AreaCreate from "./components/areaCreate";
import { StudyAreas } from "./components/userAreaList";
import AreaColumns from "./components/areaColumns";
import IntatactiveBoard from "./components/intaractiveBoard";
import UserRedact from "./components/userRedact";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import { Navbar, Nav, NavDropdown, FormControl, Button, Form } from "react-bootstrap";
import { CookiesProvider } from 'react-cookie';
import { useCookies } from 'react-cookie';
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './components/mainpage';



const Div = styled.div`
    margin: 0 auto;
    max-width: 600px;
    display: flex;
    flex-direction: column;    
    justify-content: center;
    align-items: center;
    flex-basis: 10px;

`
const Ul = styled.ul`
list-style-type: none;
margin: 0;
padding: 0;
overflow: hidden;
background-color: #333;
`
const Li = styled.li`
display: inline-block;
    color: green;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
`
const A = styled.a`
text-decoration: none;
`
const decoratedA = {
    textDecoration: 'none'
}


export default function Todo() {
    // const firstUpdate = useRef(true)
    const history = useHistory()  
    const [cookies, setCookie, removeCookie] = useCookies(['User']);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(cookies.User)
    const [areas, setAreas] = useState(null)

    // if (!user && cookies.User) {
    //     useEffect(() => {
    //         setUser(cookies.User)
    //     }, [user])
    // }
    // useLayoutEffect(() => {
    //     console.log('1');
    //     if (firstUpdate.current) {
    //         setUser(cookies.User)
    //     }
    // })


    // const findArea = () => useCallback(async () => {
    //     let response = await fetch(`http://localhost:3000/api/areaGet/${user[0].id}`)
    //     if (response.ok) {
    //         let areas = await response.json()
    //         console.log(areas);
    //         setAreas(areas)
    //         return (areas)
    //     }
    // }, [])

    useEffect(() => {
        (async () => {
            if (user && user.id) {
                let response = await fetch(`http://localhost:3000/api/areaGet/${user.id}`)
                if (response.ok) {
                    let areas = await response.json()
                    setAreas(areas)
                }
            }
        })()

    }, [user])    

    async function userLogin(useremail, userpass) {
        let response = await fetch(`http://localhost:3000/api/userLog/${useremail}/${userpass}`)
        if (response.ok) {
            let user = await response.json()
            console.log(user);
            setUser(user[0])
            setCookie('User', user[0])
        }
    }

    async function userRegistration(userName, userSurname, email, userpassword) {
        let response = await fetch('http://localhost:3000/api/userRegistration', {
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
            let userRegLog = await response.json()
            // console.log(userRegLog);            
            setUser(userRegLog)
            // console.log(user);         
            setCookie('User', userRegLog)
        }
    }

    async function areaCreate(name, description, user_id) {
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
        }
        // if (!user && cookies.User) {
        // useEffect(() => {
        //     setUser(cookies.User)
        // }, [cookies])
        // }
        console.log(user);
        console.log(cookies.User);
    }



    // const user = useSelector(state => state.userList.loggedIn)
    // if (user) {
    //     dispatch(userFindArea(user[0].id))         
    // }
    // console.log(user);

    function userOut() {
        removeCookie('User')
        setUser(null)
    }

    function logged() {
        if (user) {
            return (<><Link style={decoratedA} className="mr-sm-2" to="/profile">{user.name} {user.surname}</Link><Link to='/users' style={decoratedA} className="mr-sm-2" onClick={userOut}>Выйти</Link></>)
        } else {
            return (
                <>
                    <Link style={decoratedA} className="mr-sm-2" to="/form">Регистрация</Link>
                    <Link style={decoratedA} className="mr-sm-2" to="/users">Вход</Link>
                </>

            )
        }


    }




    return (
        <CookiesProvider>
            <Router>
                <>
                    <Navbar bg="dark" variant="dark">
                        <Navbar.Brand ><Link to='/'> StudyArea.ru</Link></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href="/areaCreate"></Nav.Link>
                                <Nav.Link ><Link to='/areaCreate'>Создать учебное пространство</Link></Nav.Link>
                                <Nav.Link ><Link to='/areaList' >Список учебный пространств</Link></Nav.Link>
                                
                            </Nav>
                            {logged()}

                        </Navbar.Collapse>
                    </Navbar>
                </>
                <Switch>
                    <Route path="/users">                        
                        {user ? <Redirect to='/areaList' />: <Users userLogin={userLogin} />}
                    </Route>
                    <Route path="/form">
                        {user ? <Redirect to='/areaList' /> : <UserForm userReg={userRegistration} />}
                    </Route>
                    <Route path="/areaCreate">
                        {!user ? <Redirect to='/users' /> : <AreaCreateFunc areaCreate={areaCreate} user_id={user ? user.id : null} />}
                    </Route>
                    <Route path="/areaList">
                        {!user ? <Redirect to='/users' /> : <AreaList user_id={areas} />}
                    </Route>
                    <Route path="/areaColumns" component={AreaColumns}>
                        {/* {!user ? <Redirect to='/users' /> : <AreaColumnsRender />} */}
                    </Route>
                    <Route path="/board" component={IntatactiveBoard} />
                    <Route path="/profile" component={UserRedact} />
                    <Route exact path="/" component={MainPage} />

                </Switch>
            </Router>
        </CookiesProvider>
    )
}

function AreaColumnsRender() {
    return <AreaColumns></AreaColumns>
}

function AreaList({ user_id }) {
    return <StudyAreas user_id={user_id}></StudyAreas>
}

function UserForm(props) {
    return <RegForm userReg={props}></RegForm>
}
function Users(props) {
    return <UserList userLogin={props}></UserList>
}
function AreaCreateFunc(props) {
    return <AreaCreate areaCreate={props.areaCreate} user_id={props.user_id}></AreaCreate>
}

// function AreaListFunc() {

//     return <StudyAreas></StudyAreas>
// }


    //const [tasks, setTasks] = useState([])

    // useEffect(() => {
    //     serverCall()
    // }, [])

    // async function serverCall() {
    //     let response = await fetch('http://localhost:3000/api/taskManager')
    //     if (response.ok) {
    //         let res = await response.json()
    //         setTasks(res)
    //     }

    // }

    // async function addTaskToCheckList(input) {
    //     let response = await fetch('http://localhost:3000/api/taskManager', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             id: tasks.length + 1,
    //             text: input,
    //             check: false
    //         })
    //     })
    //     if (response.ok) {
    //         setTasks([...tasks, { id: tasks.length + 1, text: input, check: false }])
    //     }
    // }

    // async function callbackChange(id) {
    //     let response = await fetch(`http://localhost:3000/api/taskManager/${id}`, {
    //         method: 'PATCH',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             check: !(tasks.find(task => id == task.id).check)
    //         })
    //     })
    //     if (response.ok) {
    //         setTasks(tasks.map((item) => item.id == id ? { id: item.id, text: item.text, check: !item.check } : item))
    //     }
    // }
    // async function taskDelete(id) {
    //     let response = await fetch(`http://localhost:3000/api/taskManager/${id}`, {
    //         method: 'DELETE',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         }
    //     })
    //     if (response.ok) {
    //         console.log('OK');
    //     }
    // }

    // return (
    //     <div></div>

        // <Div>
        //     <Input  />
        //     <div>
        //         <Ul>
        //             <Tasklist >
        //                 {
        //                 (task) => <StyledLi id={task.id} text={task.text} check={task.check} key={task.id}  />
        //                 }                          
        //             </Tasklist>


        //         </Ul>
        //     </div>
        // </Div>
//     )

// }

// export default class Todo extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             tasks: []            
//         }
//         this.addTaskToCheckList = this.addTaskToCheckList.bind(this);        
//         this.callbackChange = this.callbackChange.bind(this);
//     }
//     async componentDidMount() {
//         let response = await fetch("http://localhost:3000/")
//         if (response.ok) {
//             response = await response.json()
//             this.setState({ tasks: response })
//         }


//     }    

//     async addTaskToCheckList(input) {
// let response = await fetch('http://localhost:3000/api/taskManager', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//         id: this.state.tasks.length + 1,
//         text: input,
//         check: false
//     })
// })
// if (response.ok) {
//     this.setState({ tasks: [...this.state.tasks, { id: this.state.tasks.length + 1, text: input, check: false }] })
// }

//     }

// // todoItems() {
// //     // const items = this.state.tasks.map((item) =>
// //     //    <Tasklist id={item.id} text={item.text} check={item.check} key={item.id}/>
// //     // )

// //     return (items)
// // }

// async taskDelete(id) {
//     let response = await fetch(`http://localhost:3000/api/taskManager/${id}`, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     })
//     if (response.ok) {
//         console.log('OK');
//     }
// }

// async callbackChange(id) {
//     let response = await fetch(`http://localhost:3000/api/taskManager/${id}`, {
//         method: 'PATCH',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             check: !(this.state.tasks.find(task => id == task.id).check)
//         })
//     })
//     if (response.ok) {
//         this.setState({ tasks: this.state.tasks.map((item) => item.id == id ? { id: item.id, text: item.text, check: !item.check } : item) })
//     }
// }

// render() {
//     return (
//         <>
//             <Input input={this.state.input} addTaskToCheckList={this.addTaskToCheckList} />
//             <div>
//                 <ul >
//                     <Tasklist tasks={this.state.tasks} callback={this.callbackChange} deleteCallback={this.taskDelete} />
//                 </ul>
//             </div>
//         </>
//     )
// }
// }


