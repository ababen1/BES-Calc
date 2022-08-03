import React, { Component } from "react";
import Calculator from "./Calculator";
import "./Calculator.scss";
import { Form, Container, Row, Col, Button, Stack } from "react-bootstrap";
import CalculatorContainer from "./CalculatorsContainer";

class CalculatorPage extends Component {

    constructor(props) {
        super(props);
        this.main_calc_ref = React.createRef();
        this.calculators_container_ref = React.createRef();
        this.OnDeleteCalc = this.OnDeleteCalc.bind(this);
    }

    state = {
        nowDate: new Date(),
        calculatorRepeatNumber: 0,
        arrCalculators: [],
    }
    
    OnFocusBolderFont(ev) {
        this.setState({ name: "bold" });
    }

    OnFocusOut() {
        this.setState({ focus: "normal" });
    }

    OnCalculatePress() {
        this.calculators_container_ref.current.CalculateAll();
    }

    //clicking on calculator adding to array in state
    OnAddCalculator() {
        const data = this.main_calc_ref.current.state;
        this.calculators_container_ref.current.AddCalculator(data);
    }

    OnResetCalculator() {
        const main_calc = this.main_calc_ref.current;
        main_calc.ResetCalc()
    }

    OnDeleteCalc(idx) {
        this.calculators_container_ref.current.DeleteCalculator(idx);
    }



    render() {

        return (

            <div className="main-container">
                <Form className="customer-info">
                    <Row>
                        <Col>
                            <h5>{this.state.nowDate.toLocaleDateString()}</h5>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Control type="text" size="lg" name={"CustomerName"} placeholder={"Customer: "} />
                        </Col>
                        <Col>
                            <Form.Control type="text" size="lg" name={"facilityName"} placeholder={"Facility Name"} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Control type="text" size="lg" name={"Remarks"} placeholder={"Remarks"} />
                        </Col>
                    </Row>
                </Form>

                <br />
                <Calculator key="main" ref={this.main_calc_ref} count={0}></Calculator>
                <br />
                <Row>
                    <Col md={10}>
                        <Button variant="outline-secondary" className="reset-btn" size="lg" id="reset_calculation_btn" onClick={this.OnResetCalculator.bind(this)}>Reset</Button>
                    </Col>
                    <Col><Button className="add-row-btn" size="lg" id="add_row_btn" onClick={this.OnAddCalculator.bind(this)}>Add Row</Button></Col>
                </Row>
                <br></br>
                <CalculatorContainer ref={this.calculators_container_ref} />
                <Row>
                    <Col md={10}></Col>
                    <Col>
                        <Stack direction="horizontal" gap={2}>
                            <Button onClick={this.OnCalculatePress.bind(this)} className="" variant="primary" size="lg" id="calculate_btn">Calculate</Button>
                            <Button className="" variant="primary" size="lg" id="save_calculation_btn">Save</Button>
                        </Stack>
                    </Col>

                </Row>
            </div>

        );

    }

}
export default CalculatorPage;