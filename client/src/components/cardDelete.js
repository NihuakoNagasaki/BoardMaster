import React, { useEffect, useState } from "react";

export default function CardDelete(props) {
    
    async function deletecard() {
        await fetch(`http://localhost:3000/api/cardDelete/${props.cardid}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }

        })
        props.setcolumn(Math.random() * 10)
    }


    return(
        <button style={{float: 'right'}} onClick={deletecard}>X</button>
    )
}