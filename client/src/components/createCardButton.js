// @ts-check
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Form, Col, Button, Container, Modal } from "react-bootstrap";
import MyVerticallyCenteredModal from "./modalWindow";





export default function CreateCardButton(props) {

    const [modalShow, setModalShow] = useState(false);
    const [cardName, setCardName] = useState('')
    const [cardDescription, setcardDescription] = useState('')
    const [cardType, setCardType] = useState(1)
    console.log(cardType);

    
    function submitForm() {     
        (async () => {
            try {
                let response = await fetch(`http://localhost:3000/api/cardAdd`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: cardName,
                        description: cardDescription,
                        column_id: props.columnid,
                        area_id: props.areaid,
                        card_type: cardType
                    })

                })
            } catch (error) {
                console.log(error);
            }


        })()
        props.setcolumn(Math.random() * 10)
        setCardName('')
        setcardDescription('')
        setModalShow(false)
    }
    return (
        <>
            <Button variant="primary" onClick={() => setModalShow(true)}>
                Создать карточку
      </Button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                cardname={cardName}
                setcardname={setCardName}
                carddescription={cardDescription}
                setcarddescription={setcardDescription}
                submit={submitForm}
                cardType={cardType}
                setCardType={setCardType}
            />
        </>
        // <Button id={props.columnid} onClick={change}>Создать карточку</Button>
    )
}

