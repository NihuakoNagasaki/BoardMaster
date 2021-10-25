// @ts-check
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import { userFindEmail, usersGotten } from "../features/taskList/userListSlice";
import { Form, Button, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useCookies } from 'react-cookie';

const formContainer = {
    width: "500px",
    marginTop: '5%',
    backgroundColor: 'rgba(245, 245, 245, 0.8)',
    padding: "3%",
    border: "2px solid black",
    borderRadius: '5px'
}


export default function UserList(props) {  
   
    const [usermail, setUserMail] = useState('')
    const [userPass, setuserPass] = useState('')
    const history = useHistory()   
    
    function submit() {
        event.preventDefault()
        props.userLogin.userLogin(usermail, userPass)       

        history.push('/')
    }    

    return (
        <Container style={formContainer}>
            <Form onSubmit={submit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control value={usermail} onChange={(event) => setUserMail(event.target.value)} type="email" placeholder="Введите почту" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control value={userPass} onChange={(event) => setuserPass(event.target.value)} type="password" placeholder="Пароль" />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Запомнить меня" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Войти
  </Button>
            </Form>
        </Container>
    )
}