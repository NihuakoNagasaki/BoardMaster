// @ts-check

import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import { userAddToList } from "../features/taskList/userListSlice";
import { Form, Col, Button, Container } from "react-bootstrap";

const formContainer = {
    width: "500px",
    marginTop: '5%',
    backgroundColor: 'rgba(245, 245, 245, 0.8)',
    padding: "3%",
    border: "2px solid black",
    borderRadius: '5px'
}

export default function UserRedact() {
    return (
        <Container style={formContainer}>
            <Form>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={'igor.ilji@gmail.com'} placeholder="Введите email" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type="password" value={'12345'} placeholder="Пароль" />
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="formGridAddress1">
                    <Form.Label>Имя</Form.Label>
                    <Form.Control value={'Вася'} placeholder="1234 Main St" />
                </Form.Group>

                <Form.Group controlId="formGridAddress2">
                    <Form.Label>Фамилия</Form.Label>
                    <Form.Control value={'Булочкин'} placeholder="Apartment, studio, or floor" />
                </Form.Group>


               

                <Button variant="primary" type="submit">
                    Изменить
  </Button>
            </Form>
        </Container>
    )
}