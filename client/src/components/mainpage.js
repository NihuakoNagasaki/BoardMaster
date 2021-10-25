// @ts-check

import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import { userAddToList } from "../features/taskList/userListSlice";
import { Form, Col, Button, Container, Carousel } from "react-bootstrap";
import { Link } from 'react-router-dom';

export default function MainPage() {
    return (
        <Container style={{width: '1100px', marginTop: '10%'}}>
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://gdb.rferl.org/896C5DE4-4A05-4ABF-8A65-98757BCE519C_w1200_r1.jpg"
                        alt="First slide"
                    />
                    <Carousel.Caption style={{marginBottom: '17%'}}>
                        <h3>Приветствуем на сайте StudyArea.ru</h3>
                        <p>Если вы здесь впервые, вы можете <Link className="mr-sm-2" to="/form">Зарегистрироваться</Link></p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://gdb.rferl.org/896C5DE4-4A05-4ABF-8A65-98757BCE519C_w1200_r1.jpg"
                        alt="Second slide"
                    />

                    <Carousel.Caption style={{marginBottom: '17%'}}>
                        <h3>Если у вас уже есть аккаунт</h3>
                        <p>Предлагаем <Link className="mr-sm-2" to="/users">Войти</Link></p>
                    </Carousel.Caption>
                </Carousel.Item>
               
              
            </Carousel>
        </Container>
    )
}