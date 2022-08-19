import React, { Component, useState } from "react";
import { ListGroup, Form, CloseButton } from "react-bootstrap";
import "./Calculator.scss";


const IMAX_VALUES = {
    111: "5 x 16",
    143: "3 x 25 + 16",
    173: "3 x 35 + 16",
    205: "3 x 50 + 25",
    252: "3 x 70 + 35",
    303: "3 x 95 + 50",
    346: "3 x 120 + 70",
    390: "3 x 150 + 70",
    441: "3 x 185 + 95",
    551: "3 x 240 + 120",
}

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
    const [formValid, setFormValid] = useState(false);

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

    const ResetCalc = function () {
        setCalcData(GetInitialState());
        setFormValid(false);
    }

    // Update() {
    //     this.calc_form.current.checkValidity();
    //     if (this.props.OnUpdateCalc) {
    //         this.props.OnUpdateCalc(this.props.count - 1, calcData);
    //     }
    // }

    const IsEmpty = function () {
        return calcData === GetInitialState();
    }

    // OnChangeHandlerDescription(ev) {
    //     this.setState({ description: ev.target.value }, this.Update);
    // }

    // OnChangeHandlerAmp(ev) {
    //     this.setState({ ampacity: ev.target.value }, this.Update);
    // }

    // OnWireChange(ev) {
    //     this.setState({ "wire": ev.target.id }, this.Update);
    // }

    // OnCableChange(ev) {
    //     this.setState({ "cable": ev.target.id }, this.Update);
    // }

    const OnSubmit = function (event) {
        event.preventDefault();
        if (event.target.current.checkValidity()) {
            AddCalculator()
        }
    }

    const AddCalculator = function () {
        if (props.addCalc) {
            props.addCalc.call(calcData);
        }
    }

    return (
        <div className="calculator">
            <Form onSubmit={(e) => OnSubmit(e)} noValidate>
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
            </Form>
        </div >

    );
}