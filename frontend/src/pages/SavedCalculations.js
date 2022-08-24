import React, { useState } from "react";
import { Button, Form, InputGroup, ListGroup } from "react-bootstrap";
import resetIcon from 'Assets/reset.svg'

import 'scss/SavedCalculations.scss'
import 'scss/Calculator.scss'
export default function SavedCalculations(props) {

    const [calculations, setCalculations] = useState();
    const [user, setUser] = useState();

    const savedCalculation = (
        <div>
            <ListGroup horizontal className="saved-calculation">
                <ListGroup.Item className="icons">

                </ListGroup.Item>
                <ListGroup.Item className="file-description">

                </ListGroup.Item>
                <ListGroup.Item className="facility">

                </ListGroup.Item>
                <ListGroup.Item className="customer">
                </ListGroup.Item>
                <ListGroup.Item className="date">

                </ListGroup.Item>
                <ListGroup.Item className="delete">

                </ListGroup.Item>


            </ListGroup>

            <div className="hseperator">
                <div className="hline" />
            </div>
        </div>
    )

    return (
        <div className="main-container">
            <h3 className="welcome">Welcome</h3>

            <div className="search">
                <div className="big-search">
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="Search By Description">

                        </Form.Control>
                    </InputGroup>
                </div>
                <div className="small-searches">
                    <Form.Control
                        type="text"
                        placeholder="Search By Facility Name" />
                    <Form.Control
                        type="text"
                        placeholder="Search By Customer" />
                    <Form.Control
                        type="text"
                        placeholder="Search By Date" />
                </div>
                <Button>Search</Button>
            </div>


            <div className="calculations-container">
                {savedCalculation}
                {savedCalculation}
                {savedCalculation}
            </div>
        </div>
    )
}