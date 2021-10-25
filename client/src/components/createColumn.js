// @ts-check
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Form, Col, Button, Container, Modal } from "react-bootstrap";
import MyVerticallyCenteredModal from "./columnModalWindow";






export default function CreateColumn(props) {

    const [modalShow, setModalShow] = useState(false);
    const [columnName, setcolumnName] = useState('')
    const [columnDescription, setcolumnDescription] = useState('')


    
    function submitForm() {     
        (async () => {
            try {
                let response = await fetch(`http://localhost:3000/api/columnAdd`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: columnName,
                        description: columnDescription,                        
                        area_id: props.areaid
                    })

                })
            } catch (error) {
                console.log(error);
            }


        })()
        props.setcolumn(Math.random() * 10)
        setcolumnName('')
        setcolumnDescription('')
        setModalShow(false)
    }
    return (
        <>
            <Button variant="primary" onClick={() => setModalShow(true)}>
                Создать Колонку
      </Button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}   
                columnName={columnName}    
                setcolumnName={setcolumnName} 
                columnDescription={columnDescription}   
                setcolumnDescription={setcolumnDescription}   
                submit={submitForm}  
            />
        </>
        // <Button id={props.columnid} onClick={change}>Создать карточку</Button>
    )
}

