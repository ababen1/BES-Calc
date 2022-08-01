import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Calculator from "./Calculator";
import "./Calculator.scss"

const FACTOR_CORRECTION_VALUES = [
    1,
    0.79,
    0.67,
    0.61,
    0.56,
    0.53
]

class CalculatorContainer extends Component {

    constructor(props) {
        super(props);
        this.DeleteCalculator = this.DeleteCalculator.bind(this);
    }

    state = {
        calculators_data: []
    }

    GetFactorCorrection() {
        const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
        var num_of_calcs = this.state.calculators_data.length;
        num_of_calcs = clamp(num_of_calcs, 1, 6);
        return parseFloat(FACTOR_CORRECTION_VALUES[num_of_calcs - 1]);
    }

    AddCalculator(data) {
        let updated_calcs = this.state.calculators_data;
        updated_calcs.push(data);
        this.setState({ calculators_data: updated_calcs });
    }

    AddCalculators(data_array) {
        data_array.forEach(element => {
            this.AddCalculator(element);
        });
    }

    DeleteCalculator(idx) {
        let filtered_calcs_list = this.state.calculators_data.filter((element, index) => { return index !== idx });
        this.setState({ calculators_data: [] }, () => { this.AddCalculators(filtered_calcs_list); });
    }


    render() {
        return (
            <div style={{ "textAlign": "center" }}>
                {(this.state.calculators_data.length !== 0) ?
                    <Row className="reference-row">
                        <Col md={2} style={{ width: "20%" }}>Description</Col>
                        <Col >Power [Kw]</Col>
                        <Col md={1}>Al / Cu</Col>
                        <Col md={2}>3 wire / single</Col>
                        <Col md={2}>ampacity [A]</Col>
                        <Col >Reserve (%)</Col>
                        <Col >Imax</Col>
                        <Col >S [mm^2]</Col>

                    </Row> : ""}


                {this.state.calculators_data.map((value, index) =>
                    <Calculator
                        key={index}
                        OnDeleteCalc={this.DeleteCalculator}
                        count={index + 1}
                        data={value}
                        factor={this.GetFactorCorrection()} />)}
            </div>
        );
    }
}
export default CalculatorContainer;