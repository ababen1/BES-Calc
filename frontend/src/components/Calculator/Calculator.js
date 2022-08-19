import React, { useEffect, useState } from "react";
import { ListGroup, Form, CloseButton, Stack, Button } from "react-bootstrap";
import "./Calculator.scss";

export default function Calculator(props) {

    const GetInitialState = function () {
        return {
            description: "",
            ampacity: "",
            power: "not selected",
            cable: "not selected",
            wire: "not selected",
            imax: "",
            reserve: "",
            smm2: "",
        }
    }

    const [calcData, setCalcData] = useState(GetInitialState());

    useEffect(() => {
        if (props.data) {
            setCalcData(props.data);
        }
    }, [props.data])

    const HandleChange = function (id, value) {
        setCalcData((prevData => ({
            ...prevData,
            [id]: value
        })))
    }

    const FormatResult = function (result, defaultText, asInt = false) {
        if (result === undefined || result === "") {
            return (defaultText);
        } else if (!isNaN(result)) {
            if (asInt) {
                return parseInt(result);
            } else {
                return parseFloat(result).toFixed(2);
            }
        } else {
            return result
        }
    }

    const OnReset = function () {
        setCalcData(GetInitialState());
    }

    const IsEmpty = function () {
        var isEqualsJson = (obj1, obj2) => {
            let keys1 = Object.keys(obj1);
            let keys2 = Object.keys(obj2);

            //return true when the two json has same length and all the properties has same value key by key
            return keys1.length === keys2.length && Object.keys(obj1).every(key => obj1[key] == obj2[key]);
        }
        return isEqualsJson(GetInitialState(), calcData);
    }

    const OnSubmit = function (event) {
        event.preventDefault();
        if (event.target.checkValidity()) {
            props.addCalc(calcData);
            OnReset();
        }
    }

    return (
        <div className="calculator">
            <Form onSubmit={OnSubmit} onReset={OnReset} >
                <ListGroup horizontal>
                    <div className="calc-number">
                        <span >{(props.count === 0) ? "+" : props.count}</span>
                    </div>
                    <ListGroup.Item className={props.editable ? "description" : "description long"}>
                        <Form.Control
                            as="textarea"
                            type="text"
                            id="description"
                            value={calcData.description}
                            onChange={e => (HandleChange(e.target.id, e.target.value))}
                            placeholder={"Description"} />
                    </ListGroup.Item>

                    <ListGroup.Item className="seperator">
                        <div className="vline"></div>
                    </ListGroup.Item>

                    <ListGroup.Item className="power-kw">
                        {props.editable ?
                            <Form.Select
                                value={calcData.power}
                                id="power"
                                onChange={e => (HandleChange(e.target.id, e.target.value))}>
                                <option>power KW</option>
                                <option>15</option>
                                <option>18.5</option>
                                <option>22</option>
                                <option>30</option>
                                <option>37</option>
                                <option>45</option>
                                <option>55</option>
                                <option>75</option>
                                <option>90</option>
                                <option>110</option>
                                <option>132</option>
                                <option>160</option>
                                <option>200</option>
                                <option>250</option>
                                <option>280</option>
                                <option>315</option>
                                <option>355</option>
                            </Form.Select> : calcData.power}
                    </ListGroup.Item>

                    <ListGroup.Item className="seperator">
                        <div className="vline"></div>
                    </ListGroup.Item>

                    <ListGroup.Item className="cable">
                        {props.editable ?
                            <div>
                                <Form.Check
                                    name="cable"
                                    inline
                                    id={`al`}
                                    label="Al"
                                    type="radio"
                                    checked={calcData.cable === `al`}
                                    onChange={e => (HandleChange(e.target.name, e.target.id))} />
                                <Form.Check
                                    name="cable"
                                    inline
                                    id={`cu`}
                                    label="Cu"
                                    type="radio"
                                    checked={calcData.cable === `cu`}
                                    onChange={e => (HandleChange(e.target.name, e.target.id))} />
                            </div>
                            : calcData.cable}
                    </ListGroup.Item>

                    <ListGroup.Item className="seperator">
                        <div className="vline"></div>
                    </ListGroup.Item>

                    <ListGroup.Item className="wire">
                        {props.editable ?
                            <div>
                                <Form.Check
                                    name="wire"
                                    inline
                                    id={`single`}
                                    label="Single"
                                    type="radio"
                                    checked={calcData.wire === `single`}
                                    onChange={e => (HandleChange(e.target.name, e.target.id))} />
                                <Form.Check
                                    name="wire"
                                    inline
                                    id={`3-wire`}
                                    label="3 Wire"
                                    type="radio"
                                    checked={calcData.wire === `3-wire`}
                                    onChange={e => (HandleChange(e.target.name, e.target.id))} />
                            </div> : calcData.wire}
                    </ListGroup.Item>

                    <ListGroup.Item className="seperator">
                        <div className="vline"></div>
                    </ListGroup.Item>

                    <ListGroup.Item className="ampacity">
                        {props.editable ?
                            <Form.Control
                                required
                                type={"number"}
                                step={"any"}
                                id={"ampacity"}
                                placeholder={"Ampacity"}
                                value={calcData.ampacity}
                                onChange={e => (HandleChange(e.target.id, e.target.value))} />
                            : calcData.ampacity}
                    </ListGroup.Item>

                    <ListGroup.Item className="seperator">
                        <div className="vline"></div>
                    </ListGroup.Item>

                    <ListGroup.Item className="results reserve" style={{ "color": (calcData.reserve === "") ? "#828282" : "#000000" }}>
                        {FormatResult(calcData.reserve, "Reserve(%)")}
                    </ListGroup.Item>

                    <ListGroup.Item className="seperator">
                        <div className="vline"></div>
                    </ListGroup.Item>

                    <ListGroup.Item className="results imax" style={{ "color": (calcData.reserve === "") ? "#828282" : "#000000" }}>
                        {FormatResult(calcData.imax, "Imax", true)}
                    </ListGroup.Item>

                    <ListGroup.Item className="seperator">
                        <div className="vline"></div>
                    </ListGroup.Item>

                    <ListGroup.Item className={(calcData.smm2 == "") ? "results smm2 smm2-default" : "results smm2 smm2-bold"}>
                        {FormatResult(calcData.smm2, "S[Mm^2]")}
                    </ListGroup.Item>

                    {(props.count !== 0) ?
                        <div className="delete-row">
                            <CloseButton onClick={props.OnDeleteCalc.bind(calcData, props.count - 1)}></CloseButton>
                        </div > : ""}

                </ListGroup>

                {props.editable ?
                    <div>
                        <br />
                        <Stack direction="horizontal" style={{ "justifyContent": "space-between" }}>
                            <button
                                className="reset-btn shadow-none"
                                type="reset"
                                id="reset_calculation_btn"
                                disabled={IsEmpty()}>
                                <span className="icon"></span>
                                <span>Reset</span>
                            </button>
                            <Button
                                type="submit"
                                id="add_row_btn">
                                Add Row
                            </Button>
                        </Stack>
                    </div> : ""}
            </Form>
        </div >

    );
}