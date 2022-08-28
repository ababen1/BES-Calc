import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

import 'scss/Dashboard.scss'
import 'scss/Calculator.scss'
import SavedCalculation from "components/Dashboard/SavedCalculation";
import axios from "axios";

export default function Dashboard(props) {

    const [calculations, setCalculations] = useState([]);

    useEffect(() => {
        if (props.userdata.id) {
            fetchCalculations();
        }
    }, [props.userdata])

    const fetchCalculations = function () {
        axios.get(`http://localhost:8080/calculations/${props.userdata.id}`, {
            'headers': { token: sessionStorage.getItem("token") },
            crossDomain: true,
        })
            .then((result) => {
                if (result.data.success) {
                    setCalculations(result.data.data)
                } else {
                    alert(result.data.error)
                }

            })
            .catch((error) => {
                console.log(error)
            })
    }

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
                {calculations.map((value, idx) =>
                    <SavedCalculation data={value} key={idx} />
                )}
            </div>
        </div>
    )
}