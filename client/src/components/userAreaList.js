// @ts-check
import React, { useState, useEffect } from 'react'
import { Card, Col, Button, Container } from "react-bootstrap";
import { Link } from 'react-router-dom';

const cardStyle = {
  marginLeft: "25%",
  width: "800px",
  marginTop: '5%',

}

export const StudyAreas = ({ user_id }) => {

  console.log(user_id);
  return (
    <div>
      <Link to='/areaCreate'><Button style={{ marginTop: '5%', marginLeft: '26%' }} variant="dark">Создать</Button></Link>

      {user_id && user_id.lenght !== 0 ? user_id.map((area) =>
        <Card style={cardStyle} key={area.id} className="d-flex p-2" bg={'dark'} text={'white'}>
          <Card.Header as="h5">{area.name}</Card.Header>
          <Card.Body>
            <Card.Text>
              {area.description}
            </Card.Text>
            <Link to={{pathname: `/areaColumns`, state: {area: area.id}}}><Button variant="dark">Открыть </Button></Link>
          </Card.Body>
        </Card>)

        : <div>123</div>}

    </div>
  )
}

