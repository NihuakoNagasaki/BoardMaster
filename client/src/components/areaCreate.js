// @ts-check
import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import { areaAddToList } from "../features/taskList/userListSlice";
import { Form, Col, Button, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const formContainer = {
    width: "500px",
    marginTop: '5%',
    backgroundColor: 'rgba(245, 245, 245, 0.8)',
    padding: "3%",
    border: "2px solid black",
    borderRadius: '5px'
}

export default function AreaCreate(props) {
    const [name, setName] = useState('')
    const [description, setdescription] = useState('')
    const history = useHistory()

    function submit() {
        event.preventDefault()
        props.areaCreate(name, description, props.user_id)
        history.push('/areaList')
    }

    return (
        <Container style={formContainer}>
            <Form onSubmit={submit}>

                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label >Название</Form.Label>
                    <Form.Control value={name} onChange={(event) => setName(event.target.value)} type="text" placeholder="Введите название" />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Описание</Form.Label>
                    <Form.Control value={description} onChange={(event) => setdescription(event.target.value)} as="textarea" rows={8} />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Добавление пользоателя</Form.Label>
                    <Form.Control as="select">
                        <option>Введите Email пользователя, чтобы добавить его</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Form.Control>
                </Form.Group>


                <Button variant="primary" type="submit">Создать</Button>
            </Form>
        </Container>
    )
}
