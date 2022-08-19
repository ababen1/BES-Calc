import React, { useState } from "react";
import Calculator from "./Calculator";
import { Form, Button, Stack } from "react-bootstrap";
import CalculatorContainer from "./CalculatorsContainer";
import "./Calculator.scss";

export default function CalculatorPage(props) {

    const [date, setDate] = useState(new Date());
    const [resetDisabled, setResetDisabled] = useState(true);
    const [mainCalculatorValidated, setMainCalculatorValidated] = useState(false);
    const [calculators, setCalculators] = useState([]);

    // OnFocusBolderFont(ev) {
    //     this.setState({ name: "bold" });
    // }

    // OnFocusOut() {
    //     this.setState({ focus: "normal" });
    // }

    //clicking on calculator adding to array in state
    const OnAddCalculator = function (data) {
        if (data.ampacity === "") {
            // TODO: add a better way to notify this
            alert("please enter ampacity")
        } else {
            props.AddCalculator.call(data);
            OnResetCalculator();
        }
    }

    const OnResetCalculator = function () {
        setResetDisabled(true);
    }

    // OnDeleteCalc(idx) {
    //     this.calculators_container_ref.current.DeleteCalculator(idx);
    // }

    // updateButtons() {
    //     this.setState({ resetDisabled: this.main_calc_ref.current.IsEmpty() })
    // }

    return (
        <div className="main-container">
            <div className="customer-info">
                <Form>
                    <h5>{date.toLocaleDateString()}</h5>
                    <Stack direction="horizontal">
                        <Form.Control type="text" size="lg" name={"CustomerName"} placeholder={"Customer "} />
                        <Form.Control type="text" size="lg" name={"facilityName"} placeholder={"Facility Name"} />
                    </Stack>
                    <Form.Control type="text" size="lg" name={"Remarks"} placeholder={"Remarks"} />
                </Form>
            </div>

            <br />

            <div className="calcs-list">
                <Calculator
                    key="main"
                    count={0}
                    editable={true}
                    addCalc={OnAddCalculator}></Calculator>
            </div>

            <br />

            <Stack direction="horizontal" style={{ "justifyContent": "space-between" }}>
                <button
                    className="reset-btn shadow-none"
                    size="lg"
                    id="reset_calculation_btn"
                    onClick={OnResetCalculator}
                    disabled={resetDisabled}>

                    <span className="icon"></span>
                    <span>Reset</span>
                </button>
                <Button
                    size="lg"
                    id="add_row_btn">
                    Add Row
                </Button>
            </Stack>

            <br />

            <CalculatorContainer/>
        </div>

    );

}


