import React, { Component } from "react";
import Calculator from "./Calculator";

class CalculatorContainer extends Component {

    constructor(props) {
        super(props);
        this.DeleteCalculator = this.DeleteCalculator.bind(this);
    }

    state = {
        calculators_data: []
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

    Calculate(data) {
        let ampacityArr = [111, 143, 173, 205, 252, 303, 346, 390, 441, 511];
        let imax = parseFloat(data.ampacity);
        let calculationAmpacity = 0;
        for (let i = 0; i < ampacityArr.length; i++) {
            if (imax > ampacityArr[i]) {
                calculationAmpacity = ampacityArr[i + 1];
                data.ampacityResult = calculationAmpacity;
            }
            if (imax === ampacityArr[i]) {
                data.ampacityResult = ampacityArr[i];
            }
        }
    }

    CalculateAll() {
        for (let data of this.state.calculators_data) {
            this.Calculate(data);
        }
    }


    render() {
        return (
            this.state.calculators_data.map((value, index) =>
                <Calculator key={index} OnDeleteCalc={this.DeleteCalculator} count={index + 1} data={value} />)
        );
    }
}
export default CalculatorContainer;