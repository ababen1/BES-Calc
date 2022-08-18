import React, { Component } from "react";
import "./Calculator.scss";
import { ListGroup, Form, CloseButton } from "react-bootstrap";

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

class Calculator extends Component {

    constructor(props) {
        super(props);
        this.calc_form = React.createRef();
        this.IsEmpty = this.IsEmpty.bind(this);
        this.state = this.getInitialState();
        this.Update = this.Update.bind(this);
    }

    componentDidMount() {
        this.setState(this.props.data);
    }

    // componentDidUpdate(prevProps) {
    //     if (prevProps.factor !== this.props.factor) {
    //         this.setState({ factor: this.props.factor });
    //     }
    // }

    getInitialState() {
        return {
            description: "",
            ampacity: "",
            power: "not selected",
            cable: "not selected",
            wire: "not selected",
            imax: "",
            reserve: "",
            smm2: "",
            formValid: false,
        }
    }

    FormatResult(result, defaultText, asInt = false) {
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

    ResetCalc() {
        this.setState(this.getInitialState());
        
    }

    Update() {
        this.calc_form.current.checkValidity();
        if (this.props.OnUpdateCalc) {
            this.props.OnUpdateCalc(this.props.count - 1, this.state);
        }
    }

    IsEmpty() {
        return this.state === this.getInitialState();
    }

    OnChangeHandlerDescription(ev) {
        this.setState({ description: ev.target.value }, this.Update);
    }

    OnChangeHandlerAmp(ev) {
        this.setState({ ampacity: ev.target.value }, this.Update);
    }

    OnWireChange(ev) {
        this.setState({ "wire": ev.target.id }, this.Update);
    }

    OnCableChange(ev) {
        this.setState({ "cable": ev.target.id }, this.Update);
    }

    OnSubmit(event) {
        event.preventDefault();
        this.AddCalculator();
    }

    AddCalculator() {
        const isValid = this.calc_form.current.checkValidity();
        this.setState({formValid: isValid});
        if (isValid) {
            if (this.props.addCalc) {
                this.props.addCalc(this.state);
            }
        }
    }

    render() {
        return (
            <div className="calculator">
                <Form ref={this.calc_form} onSubmit={this.OnSubmit.bind(this)} noValidate>
                    <ListGroup horizontal>
                        <div className="calc-number">
                            <span >{(this.props.count === 0) ? "+" : this.props.count}</span>
                        </div>
                        <ListGroup.Item className={this.props.editable ? "description" : "description long"}>
                            <Form.Control as="textarea"
                                type="text" value={this.state.description}
                                onChange={this.OnChangeHandlerDescription.bind(this)}
                                placeholder={"Description"} />
                        </ListGroup.Item>

                        <ListGroup.Item className="seperator">
                            <div className="vline"></div>
                        </ListGroup.Item>

                        <ListGroup.Item className="power-kw">
                            {this.props.editable ?
                                <Form.Select
                                    value={this.state.power}
                                    onChange={(ev) => { this.setState({ "power": ev.target.value }); }}>
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
                                </Form.Select> : this.state.power}
                        </ListGroup.Item>

                        <ListGroup.Item className="seperator">
                            <div className="vline"></div>
                        </ListGroup.Item>

                        <ListGroup.Item className="cable">
                            {this.props.editable ?
                                <div>
                                    <Form.Check
                                        name="cable"
                                        inline
                                        id={`al`}
                                        label="Al"
                                        type="radio"
                                        checked={this.state.cable === `al`}
                                        onChange={this.OnCableChange.bind(this)} />
                                    <Form.Check
                                        name="cable"
                                        inline
                                        id={`cu`}
                                        label="Cu"
                                        type="radio"
                                        checked={this.state.cable === `cu`}
                                        onChange={this.OnCableChange.bind(this)} />
                                </div>
                                : this.state.cable}
                        </ListGroup.Item>

                        <ListGroup.Item className="seperator">
                            <div className="vline"></div>
                        </ListGroup.Item>

                        <ListGroup.Item className="wire">
                            {this.props.editable ?
                                <div>
                                    <Form.Check
                                        name="wire"
                                        inline
                                        id={`single`}
                                        label="Single"
                                        type="radio"
                                        checked={this.state.wire === `single`}
                                        onChange={this.OnWireChange.bind(this)} />
                                    <Form.Check
                                        name="wire"
                                        inline
                                        id={`3-wire`}
                                        label="3 Wire"
                                        type="radio"
                                        checked={this.state.wire === `3-wire`}
                                        onChange={this.OnWireChange.bind(this)} />
                                </div> : this.state.wire}
                        </ListGroup.Item>

                        <ListGroup.Item className="seperator">
                            <div className="vline"></div>
                        </ListGroup.Item>

                        <ListGroup.Item className="ampacity">
                            {this.props.editable ?
                                <Form.Control
                                    required
                                    type={"number"}
                                    step={"any"}
                                    name={"ampacity"}
                                    placeholder={"Ampacity"}
                                    value={this.state.ampacity}
                                    onChange={this.OnChangeHandlerAmp.bind(this)} />
                                : this.state.ampacity}
                        </ListGroup.Item>

                        <ListGroup.Item className="seperator">
                            <div className="vline"></div>
                        </ListGroup.Item>

                        <ListGroup.Item className="results reserve" style={{ "color": (this.state.reserve === "") ? "#828282" : "#000000" }}>
                            {this.FormatResult(this.state.reserve, "Reserve(%)")}
                        </ListGroup.Item>

                        <ListGroup.Item className="seperator">
                            <div className="vline"></div>
                        </ListGroup.Item>

                        <ListGroup.Item className="results imax" style={{ "color": (this.state.reserve === "") ? "#828282" : "#000000" }}>
                            {this.FormatResult(this.state.imax, "Imax", true)}
                        </ListGroup.Item>

                        <ListGroup.Item className="seperator">
                            <div className="vline"></div>
                        </ListGroup.Item>

                        <ListGroup.Item className={(this.state.smm2 == "") ? "results smm2 smm2-default" : "results smm2 smm2-bold"}>
                            {this.FormatResult(this.state.smm2, "S[Mm^2]")}
                        </ListGroup.Item>

                        {(this.props.count !== 0) ?
                            <div className="delete-row">
                                <CloseButton onClick={this.props.OnDeleteCalc.bind(this, this.props.count - 1)}></CloseButton>
                            </div > : ""}

                    </ListGroup>
                </Form>
            </div >

        );
    }
}
export default Calculator;