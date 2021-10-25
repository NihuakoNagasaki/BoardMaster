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
                    Форма создания Колонки
          </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label >Название</Form.Label>
                        <Form.Control value={props.columnName} onChange={(event) => props.setcolumnName(event.target.value)} type="text" placeholder="Введите название" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Описание</Form.Label>
                        <Form.Control value={props.columnDescription} onChange={(event) => props.setcolumnDescription(event.target.value)} as="textarea" rows={6} placeholder="Описание" />
                    </Form.Group>


                    <Button variant="primary" type="button" onClick={props.submit}>Создать</Button>
                
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    );
}