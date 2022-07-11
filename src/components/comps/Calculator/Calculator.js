import React, { Component } from "react";
import "./calculator.css";
import loginClose from "../../../Assets/login close icon.svg";
import { Row, Col, Button, ListGroup, Form, FormControl, ButtonGroup, ToggleButton, Container } from "react-bootstrap";

class Calculator extends Component {
    
    constructor(props) {
        super(props)
        this.calc_form = React.createRef();
    }

    state = { 
        description: "",
        ampacity: "",
        power: "",
        ampacityResult: 0, 
        currently_editing: false, 
        cable: "", 
        wire: "" };


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
                            <Form.Select className="KW">
                                <option>power KW</option>
                            </Form.Select>

                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div key="inline-radio" onChange={(ev) => {this.setState({"cable": ev.target.value});}}>
                                <Form.Check name="cable" inline value="al" label="Al" type="radio" />
                                <Form.Check name="cable" inline value="cu" label="Cu" type="radio" />
                            </div>


                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div key="inline-radio" onChange={(ev) => {this.setState({"wire": ev.target.value}); console.log(this.state)}}>
                                <Form.Check name="wire" inline value ="single" label="Single" type="radio" />
                                <Form.Check name="wire" inline value="3_wire" label="3 Wire" type="radio" />
                            </div>

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
                            {(this.props.count !== 0) ? <div className="delete-element"><img src={loginClose} alt={"delete"} width={"10px"} height={"10px"} /></div> : ""}
                        </ListGroup.Item>
                    </ListGroup>
                </Form>
            </Container>
        );
    }
}
export default Calculator;