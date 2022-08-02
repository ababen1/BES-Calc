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
        calculators_data: [],
        factor: 1,
    }

    UpdateFactorCorrection() {
        const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
        let facor_idx = parseInt(clamp(this.state.calculators_data.length, 0, 5));
        this.setState({ factor: parseFloat(FACTOR_CORRECTION_VALUES[facor_idx]) });
    }

    AddCalculator(data) {
        let updated_calcs = this.state.calculators_data;

        ;
        // update the data to be correct with the current calc's index
        let count = updated_calcs.length + 1
        if (data['wire'] !== '')
            data[`wire`] = data[`wire`].substring(0, data['wire'].indexOf('#')) + '#' + count
        if (data['cable'] !== '')
            data[`cable`] = data[`cable`].substring(0, data['cable'].indexOf('#')) + '#' + count

        updated_calcs.push(data);
        this.setState({ calculators_data: updated_calcs }, this.UpdateFactorCorrection);
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
            <Container fluid style={{ "textAlign": "center" }}>
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
                        factor={this.state.factor}
                    />)}
            </Container>
        );
    }
}
export default CalculatorContainer;