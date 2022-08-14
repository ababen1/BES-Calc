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

                <div className="customer-info">
                    <Form>
                        <h5>{this.state.nowDate.toLocaleDateString()}</h5>
                        <Stack direction="horizontal">
                            <Form.Control type="text" size="lg" name={"CustomerName"} placeholder={"Customer: "} />
                            <Form.Control type="text" size="lg" name={"facilityName"} placeholder={"Facility Name"} />
                        </Stack>
                        <Form.Control type="text" size="lg" name={"Remarks"} placeholder={"Remarks"} />

                    </Form>
                </div>


                <br />
                <div className="calcs-list">
                    <Calculator key="main" ref={this.main_calc_ref} count={0}></Calculator>
                </div>
                <br />
                <Stack direction="horizontal" style={{ "justifyContent": "space-between" }}>
                    <button
                        className="reset-btn shadow-none"
                        size="lg"
                        id="reset_calculation_btn"
                        onClick={this.OnResetCalculator.bind(this)}>
                        <span className="icon"></span>
                        <span>Reset</span>
                    </button>
                    <Button className="add-row-btn" size="lg" id="add_row_btn" onClick={this.OnAddCalculator.bind(this)}>Add Row</Button>
                </Stack>
                <br />
                <CalculatorContainer ref={this.calculators_container_ref} />
            </div>

        );

    }

}
export default CalculatorPage;