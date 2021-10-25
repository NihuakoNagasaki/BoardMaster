import React, { useEffect, useState } from "react";
import { Form, Col, Button, Container, Modal } from "react-bootstrap";


function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Дз. Русский. 10.05.2021
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          1) Упр 4, стр.21
        </p>
        <p>
          2) Работа над ошибками после недавней контрольной 
        </p>
        <p>
          3) Статья про историю русского языка (Доп оценка)
        </p>
      </Modal.Body>
      <Modal.Footer>
      <Button onClick={props.onHide}>Редактировать</Button>
        <Button onClick={props.onHide}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function CardDesctiption() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="dark" onClick={() => setModalShow(true)}>
        Перейти
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

