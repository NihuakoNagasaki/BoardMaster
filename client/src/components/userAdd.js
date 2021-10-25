// @ts-check
import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import { userAddToList } from "../features/taskList/userListSlice";
import { Form, Col, Button, Container } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

const formContainer = {    
    width: "500px", 
    marginTop: '5%',
    backgroundColor: 'rgba(245, 245, 245, 0.8)',
    padding: "3%",
    border: "2px solid black",
    borderRadius: '5px'
}

export default function RegForm(props) {
    const [userName, setuserName] = useState('')
    const [userSurname, setuserSurname] = useState('')
    const [email, setemail] = useState('')
    const [userpassword, setpassword] = useState('')
    const history = useHistory()

    function submit(event) {
        event.preventDefault()
        props.userReg.userReg(userName, userSurname, email, userpassword)
        history.push('/users')             
    }
    return (
        <Container style={formContainer}>
        <Form  onSubmit={submit}>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label >Email</Form.Label>
                    <Form.Control value={email} onChange={(event) => setemail(event.target.value)} type="email" placeholder="Введите почту" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control value={userpassword} onChange={(event) => setpassword(event.target.value)} type="password" placeholder="Пароль" />
                </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridAddress1">
                <Form.Label>Имя</Form.Label>
                <Form.Control value={userName} onChange={(event) => setuserName(event.target.value)} placeholder="Вася" />
            </Form.Group>

            <Form.Group controlId="formGridAddress2">
                <Form.Label>Фамилия</Form.Label>
                <Form.Control value={userSurname} onChange={(event) => setuserSurname(event.target.value)} placeholder="Булочкин" />
            </Form.Group>

            <Button variant="primary" type="submit">Создать</Button>
        </Form>
        </Container>



        // <form className={props.className} onSubmit={submit}>
        //     <input placeholder="имя" value={userName} onChange={(event) => setuserName(event.target.value)}></input>
        //     <input placeholder="Фамилия" value={userSurname} onChange={(event) => setuserSurname(event.target.value)}></input>
        //     <input placeholder="Мыло" value={email} onChange={(event) => setemail(event.target.value)}></input>
        //     <input placeholder="Пароль" value={userpassword} onChange={(event) => setpassword(event.target.value)}></input>
        //     <button type='submit'>Создать</button>
        // </form>
    )
}