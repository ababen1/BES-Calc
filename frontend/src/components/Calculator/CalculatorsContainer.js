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
        calculatorsData: [],
        factor: 1,
    }

    CalculateAll() {
        
    }

    UpdateFactorCorrection() {
        const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
        let facor_idx = parseInt(clamp(this.state.calculatorsData.length, 0, 5));
        this.setState({ factor: parseFloat(FACTOR_CORRECTION_VALUES[facor_idx]) });
    }

    AddCalculator(data) {
        let updated_calcs = this.state.calculatorsData;

        ;
        // update the data to be correct with the current calc's index
        let count = updated_calcs.length + 1
        if (data['wire'] !== '')
            data[`wire`] = data[`wire`].substring(0, data['wire'].indexOf('#')) + '#' + count
        if (data['cable'] !== '')
            data[`cable`] = data[`cable`].substring(0, data['cable'].indexOf('#')) + '#' + count

        updated_calcs.push(data);
        this.setState({ calculatorsData: updated_calcs }, this.UpdateFactorCorrection);
    }

    AddCalculators(data_array) {
        data_array.forEach(element => {
            this.AddCalculator(element);
        });
    }

    DeleteCalculator(idx) {
        let calcsList = this.state.calculatorsData;
        let newList = [];
        for (let index = 0; index < calcsList.length; index++) {
            if (index != idx) {
                newList.push(calcsList[index]);
            }
        }
        this.setState({calculatorsData: []}, () => { this.AddCalculators(newList) });
    }


    render() {
        return (
            <Container fluid>
                {(this.state.calculatorsData.length !== 0) ?
                    <Row className="reference-row">
                        <div style={{ "width": "253px" }} >Description</div>
                        <div style={{ width: "150px" }}>Power [Kw]</div>
                        <div style={{ width: "143px" }}>Al / Cu</div>
                        <div style={{ width: "168px" }}>3 wire / single</div>
                        <div style={{ width: "250px" }}>ampacity [A]</div>
                        <div style={{ width: "150px" }}>Reserve (%)</div>
                        <div style={{ width: "80px" }}>Imax</div>
                        <div style={{ width: "100px" }}>S [mm^2]</div>

                    </Row> : ""}


                <div className="calcs-list">
                    {this.state.calculatorsData.map((value, index) =>
                        <Calculator
                            key={index}
                            OnDeleteCalc={this.DeleteCalculator}
                            count={index + 1}
                            data={value}
                            factor={this.state.factor}
                        />)}
                </div>
            </Container>
        );
    }
}
export default CalculatorContainer;