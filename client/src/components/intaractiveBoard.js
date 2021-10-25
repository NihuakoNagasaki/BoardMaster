// @ts-check
import React, { useEffect, useState } from "react";
import { fabric } from 'fabric';

function IntatactiveBoard(props) {
    const [canvas, setCanvas] = useState();
    const [card, setCard] = useState()
    const jsonObj = {}

    useEffect(() => {

        setCanvas(initCanvas());

    }, []);


    document.addEventListener('keydown', deletePress)


    useEffect(() => {
        (async () => {
            try {

                let respose = await fetch(`http://localhost:3000/api/getCard/${props.location.state.cardid}`)
                let card = await respose.json()                
                setCard(card)

            } catch (error) {
                console.log(error);
            }


        })()

    }, [])

    if (canvas) {
        if (card && card[0].content) {
            canvas.loadFromJSON(card[0].content, function () {
                canvas.renderAll();
            })
        }
        canvas.on({
            'object:moving': moveHandler,
            'object:added': moveHandler,
            'object:modified': moveHandler,
            'object:removed': moveHandler,
        })
    }



    function deletePress(event) {
        if (canvas && event.code == 'Delete') {
            canvas.getActiveObjects().forEach((obj) => {
                let cobj = canvas.toObject()
                console.log(cobj);
                canvas.remove(obj)
            });
            canvas.discardActiveObject().renderAll()
        }
    }
    function moveHandler(params) {
        (async () => {
            try {
                let response = await fetch(`http://localhost:3000/api/cardContentChange/${props.location.state.cardid}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        content: JSON.stringify(canvas.toJSON())
                    })

                })
            } catch (error) {
                console.log(error);
            }


        })()
    }



    function startDrawing() {
        canvas.isDrawingMode = true

    }
    function stopDrawing() {
        canvas.isDrawingMode = false
    }

    function clearAll() {
        canvas.clear()
        moveHandler()
    }

    function saveAll() {
        canvas.loadFromJSON(jsonObj, function () {
            canvas.renderAll();
        }, function (o, object) {
            console.log(o, object)
        })
    }

    function colorChange(color) {
        canvas.freeDrawingBrush.color = color
    }    
    const initCanvas = () => (
        new fabric.Canvas('canvas', {
            width: "1000",
            height: "1000"
        })

    )

    return (
        <div style={{ backgroundColor: 'white', display: 'block'}}>
        <div style={{ backgroundColor: 'white', display: 'block'}}>
            <h1>{card && card[0].name ? card[0].name : 123}</h1>
            <button onClick={startDrawing}>Начать рисовать</button>
            <button onClick={stopDrawing}>Закончить рисовать</button>
            <button onClick={clearAll}>Очистить</button>
            <button onClick={saveAll}>Сохранить</button>
            <label htmlFor="drawing_color">Цвет: </label>
            <input type="color" value="#005E7A" id="drawing_color" onChange={(event) => colorChange(event.target.value)}></input>
            <canvas id="canvas" style={{marginLeft: '10%',   }} />
        </div>
        </div>
    )

}

export default IntatactiveBoard;
