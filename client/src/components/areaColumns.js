// @ts-check
import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useParams } from "react-router";
import CreateCardButton from "./createCardButton";
import CreateColumn from "./createColumn";
import CardDelete from "./cardDelete";
import { Link } from "react-router-dom";
import CardDesctiption from "./cardDescription";



const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);

        (async () => {
            try {
                let response = await fetch(`http://localhost:3000/api/cardChange/${removed.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        column_id: destColumn.id
                    })

                })
            } catch (error) {
                console.log(error);
            }


        })()

        destItems.splice(destination.index, 0, removed);


        setColumns({
            ...columns,
            [source.droppableId]: {
                ...sourceColumn,
                items: sourceItems
            },
            [destination.droppableId]: {
                ...destColumn,
                items: destItems
            }
        });
    } else {
        const column = columns[source.droppableId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...column,
                items: copiedItems
            }
        });
    }
};

const columnsDiv = {
    display: "flex",
    justifyContent: "center",
    // width: '80%',
    height: "100%",
    // marginTop: '5%',
    // backgroundColor: 'rgba(245, 245, 245, 0.8)',
    // padding: "3%",
    // border: "2px solid black",
    // borderRadius: '5px'
}

function AreaColumns(props) {

    const [testcolumns, setTestColumns] = useState()
    const [columns, setColumns] = useState();
    const [cards, setCards] = useState([])
    const [change, setChange] = useState(null)

    useEffect(() => {
        (async () => {
            try {
                if (props.location.state.area) {
                    let column = await fetch(`http://localhost:3000/api/areaColumns/${props.location.state.area}`)
                    let columns = await column.json()

                    let cards = await fetch(`http://localhost:3000/api/getCards/${props.location.state.area}`)
                    let cardsget = await cards.json()

                    columns.forEach(element => {
                        element.items = []
                        cardsget.map((card) => {
                            if (element.id === card.column_id) {
                                element.items.push(card)
                            }
                        })
                    });
                    setColumns(columns)


                }
            } catch (error) {
                console.log(error);
            }


        })()
    }, [change])


    if (columns) {
        return (
            <div style={columnsDiv}>
                <DragDropContext
                    onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
                >
                    {Object.entries(columns).map(([columnId, column], index) => {
                        // column.items.forEach(element => {
                        //     console.log(element);
                        // });
                        if (column.items) {
                            return (
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center"
                                    }}
                                    key={column.id}
                                >
                                    <h2 style={{ padding: '5px', backgroundColor: 'lightblue' }}>{column.name}</h2>
                                    <CreateCardButton columnid={column.id} areaid={props.location.state.area} setcolumn={setChange} columns={columns} />
                                    <div style={{ margin: 8 }}>
                                        <Droppable droppableId={columnId} key={columnId}>
                                            {(provided, snapshot) => {
                                                return (
                                                    <div
                                                        {...provided.droppableProps}
                                                        ref={provided.innerRef}
                                                        style={{
                                                            background: snapshot.isDraggingOver
                                                                ? "lightblue"
                                                                : "lightgrey",
                                                            padding: 4,
                                                            width: 250,
                                                            minHeight: 900
                                                        }}
                                                    >

                                                        {column && column.items.length && column.items.map((item, index) => {                                                            
                                                            if (item && item.id) {
                                                                return (
                                                                    <Draggable
                                                                        key={item.id}
                                                                        draggableId={item.id.toString()}
                                                                        index={index}
                                                                    >
                                                                        {(provided, snapshot) => {
                                                                            return (

                                                                                <div
                                                                                    ref={provided.innerRef}
                                                                                    {...provided.draggableProps}
                                                                                    {...provided.dragHandleProps}
                                                                                    style={{
                                                                                        userSelect: "none",
                                                                                        padding: 16,
                                                                                        margin: "0 0 8px 0",
                                                                                        minHeight: "50px",
                                                                                        backgroundColor: snapshot.isDragging
                                                                                            ? "#263B4A"
                                                                                            : "#456C86",
                                                                                        color: "white",
                                                                                        ...provided.draggableProps.style
                                                                                    }}
                                                                                >
                                                                                    {item.name} <CardDelete cardid={item.id} setcolumn={setChange}/>
                                                                                    <p>{item.description}</p>
                                                                                    {item.card_type === 2 ? <p><Button variant='dark'><Link to={{pathname: `/board`, state: {cardid: item.id}}}>Доска</Link></Button></p> : <p><CardDesctiption></CardDesctiption></p>}
                                                                                    
                                                                                </div>
                                                                            );
                                                                        }}
                                                                    </Draggable>
                                                                );
                                                            } else {
                                                                return (
                                                                    <span></span>
                                                                )
                                                            }

                                                        })}
                                                        {provided.placeholder}
                                                    </div>
                                                );
                                            }}
                                        </Droppable>
                                        <div style={{ width: 250, minHeight: 100 }}>{column.description}</div>

                                    </div>

                                </div>

                            );

                        } else {
                            <span></span>
                        }

                    })}
                    <div style={{
                        flexDirection: "column",
                        alignItems: "center",
                        marginTop: '5.5%'
                    }}>
                        <CreateColumn areaid={props.location.state.area} setcolumn={setChange}/>
                    </div>
                </DragDropContext>
            </div>
        );
    }
    else {
        return (
            <div>123</div>
        )
    }

}

export default AreaColumns;
