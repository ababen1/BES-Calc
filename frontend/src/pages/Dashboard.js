import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

import 'scss/Dashboard.scss'
import 'scss/Calculator.scss'
import SavedCalculation from "components/Dashboard/SavedCalculation";

export default function Dashboard(props) {

    const [calculations, setCalculations] = useState();

    useEffect(() => {
        if (!props.userdata) {
            window.location.href = '/'
        }
    })

    return (
        <div className="main-container">
            <h3 className="welcome">Welcome {props.userdata.username}</h3>

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
                <SavedCalculation />
                <SavedCalculation />
                <SavedCalculation />
            </div>
        </div>
    )
}