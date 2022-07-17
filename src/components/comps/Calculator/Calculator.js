import React, { Component } from "react";
import "./calculator.css";
import loginClose from "../../../Assets/login close icon.svg";
import { Row, Col, Button, ListGroup, Form, FormControl, ButtonGroup, ToggleButton, Container, InputGroup, CloseButton } from "react-bootstrap";

class Calculator extends Component {

    state = { 
        description: "",
        ampacity: "",
        power: "",
        ampacityResult: 0, 
        cable: "", 
        wire: "" };
    
    constructor(props) {
        super(props)
        this.calc_form = React.createRef();
    }

    componentDidMount() {
        this.setState(this.props.data);
    }


    ResetCalc() {
        const form = this.calc_form.current;
        form.reset();
    }

    OnChangeHandlerDescription(ev) {
        this.setState({ description: ev.target.value });
    }

    OnChangeHandlerImax(ev) {
        this.setState({ ampacity: ev.target.value });
    }

    OnWireChange(ev) {
        this.setState({"wire": ev.target.id})
    }

    OnCableChange(ev) {
        this.setState({"cable": ev.target.id})
    }

    Calculation() {
        let ampacityArr = [111, 143, 173, 205, 252, 303, 346, 390, 441, 511];
        let imax = parseFloat(this.state.ampacity);
        let calculationAmpacity = 0;
        for (let i = 0; i < ampacityArr.length; i++) {
            if (imax > ampacityArr[i]) {
                calculationAmpacity = ampacityArr[i + 1];
                this.setState({ ampacityResult: calculationAmpacity });
            }
            if (imax === ampacityArr[i]) {
                this.setState({ ampacityResult: ampacityArr[i] });
            }

        }

    }

    render() {

        return (
            <Container fluid>
                <Form ref={this.calc_form}>
                    <ListGroup horizontal className="calculator">
                        <ListGroup.Item className={"add"} style={{ backgroundColor: (this.props.count === 0) ? "lightgray" : "#156982" }}>
                            <span style={{ color: "white", verticalAlign: "middle" }}>{(this.props.count === 0) ? "+" : this.props.count}</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Form.Control as="textarea" style={{ "overflow": "auto", "resize": "none" }} type="text" value={this.state.description} name={"description"} onChange={this.OnChangeHandlerDescription.bind(this)} placeholder={"Description"} />
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Form.Select className="KW" value={this.state.power} onChange={(ev) => {this.setState({"power": ev.target.value});}}>
                                <option>power KW</option>
                            </Form.Select>

                        </ListGroup.Item>
                        <ListGroup.Item>
                            <InputGroup>
                                <Form.Check name="cable" inline id="al" label="Al" type="radio" checked={this.state.cable === "al"} onChange={this.OnCableChange.bind(this)}/>
                                <Form.Check name="cable" inline id="cu" label="Cu" type="radio" checked={this.state.cable === "cu"} onChange={this.OnCableChange.bind(this)}/>
                            </InputGroup>


                        </ListGroup.Item>
                        <ListGroup.Item>
                            <InputGroup>
                                <Form.Check name="wire" inline id ="single" label="Single" type="radio" checked={this.state.wire === "single"} onChange={this.OnWireChange.bind(this)}/>
                                <Form.Check name="wire" inline id="3_wire" label="3 Wire" type="radio" checked={this.state.wire === "3_wire"} onChange={this.OnWireChange.bind(this)}/>
                            </InputGroup>

                        </ListGroup.Item>
                        <ListGroup.Item>
                            <FormControl type={"number"} name={"ampacity"} placeholder={"Ampacity"} value={this.state.ampacity} onFocus={this.Calculation.bind(this)} onChange={this.OnChangeHandlerImax.bind(this)} />

                        </ListGroup.Item>
                        <ListGroup.Item>
                            <p>Reserve(%)</p>

                        </ListGroup.Item>
                        <ListGroup.Item>

                            <p>{(this.state.ampacityResult !== 0) ? this.state.ampacityResult : "Imax"}</p>

                        </ListGroup.Item>
                        <ListGroup.Item>
                            <p>S[Mm^2]</p>

                        </ListGroup.Item>
                        <ListGroup.Item >
                            {(this.props.count !== 0) ? <CloseButton onClick={this.props.OnDeleteCalc.bind(this, this.props.count - 1)}></CloseButton> : ""}
                        </ListGroup.Item>
                    </ListGroup>
                </Form>
            </Container>
        );
    }
}
export default Calculator;