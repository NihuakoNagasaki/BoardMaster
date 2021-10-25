import React, { useEffect, useState } from "react";
import { Form, Col, Button, Container, Modal } from "react-bootstrap";

export default function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Форма создания
          </Modal.Title>
            </Modal.Header>
            <Modal.Body>


                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label >Название</Form.Label>
                    <Form.Control value={props.cardname} onChange={(event) => props.setcardname(event.target.value)} type="text" placeholder="Введите название" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Описание</Form.Label>
                    <Form.Control value={props.carddescription} onChange={(event) => props.setcarddescription(event.target.value)} as="textarea" rows={6} placeholder="Описание" />
                </Form.Group>
                <Form.Label>Тип карточки</Form.Label>
                <Form.Control as="select" onChange={(event) => props.setCardType(event.target.value)}>
                    <option value={1} >Обычная</option>
                    <option value={2} >Интерактивная доска</option>
                </Form.Control>


                <Button variant="primary" type="button" onClick={props.submit}>Создать</Button>

            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    );
}