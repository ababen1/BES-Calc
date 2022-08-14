import React, { Component } from "react";
import { Stack, Button } from "react-bootstrap";
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

function GetImax(amp, factor) {
    amp = parseFloat(amp);
    if (isNaN(amp)) {
        return NaN
    }

    // search for imax value that can contain the given ampacity 
    const imaxValues = Object.keys(IMAX_VALUES)
    for (const val of imaxValues) {
        let valWithFactor = val * factor;
        if (valWithFactor >= amp) {
            return val
        }
    }

    // if nothing was found, return the biggest imax for now.
    // in the future, divide the amp into parts and return multiple imax values.
    // (the imax list is sorted)
    return imaxValues[imaxValues.length - 1];
}

class CalculatorContainer extends Component {

    constructor(props) {
        super(props);
        this.DeleteCalculator = this.DeleteCalculator.bind(this);
        this.UpdateCalculator = this.UpdateCalculator.bind(this);
    }

    state = {
        calculatorsData: [],
        canSave: false,
    }

    CalculateAll() {
        let newCalcsList = [];
        let factor = this.GetFactorCorrection();
        let canSaveCalculation = true;
        for (let calcData of this.state.calculatorsData) {
            // Calculate imax, reserve and smm2
            let imax = GetImax(calcData.ampacity, factor);
            if (!isNaN(imax)) {
                calcData.imax = imax;
                calcData.reserve = (Math.abs(imax - calcData.ampacity) / imax) * 100;
                calcData.smm2 = IMAX_VALUES[GetImax(calcData.ampacity, 1)];
            } else {
                canSaveCalculation = false;
            }
            // add to the new list
            newCalcsList.push(calcData);
        }

        this.UpdateCalculators(newCalcsList);
        this.setState({ canSave: canSaveCalculation });
    }

    GetFactorCorrection() {
        const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
        return FACTOR_CORRECTION_VALUES[parseInt(clamp(this.state.calculatorsData.length - 1, 0, 5))];
    }

    AddCalculator(data) {
        let updated_calcs = this.state.calculatorsData;

        // update the data to be correct with the current calc's index
        let idx = updated_calcs.length + 1
        if (data['wire'] !== '')
            data[`wire`] = data[`wire`].substring(0, data['wire'].indexOf('#')) + '#' + idx
        if (data['cable'] !== '')
            data[`cable`] = data[`cable`].substring(0, data['cable'].indexOf('#')) + '#' + idx

        updated_calcs.push(data);
        this.setState({ calculatorsData: updated_calcs });
    }

    AddCalculators(data_array) {
        data_array.forEach(element => {
            this.AddCalculator(element);
        });
    }

    UpdateCalculators(newCalcsData) {
        this.setState({ calculatorsData: [] }, () => { this.AddCalculators(newCalcsData) });
    }

    UpdateCalculator(idx, data) {
        let calcList = this.state.calculatorsData;
        calcList[idx] = data;
        this.setState({ calculatorsData: calcList });
    }

    DeleteCalculator(idx) {
        let calcsList = this.state.calculatorsData;
        let newList = [];
        for (let index = 0; index < calcsList.length; index++) {
            if (index != idx) {
                newList.push(calcsList[index]);
            }
        }
        this.UpdateCalculators(newList);
    }


    render() {
        return (
            <div>
                {(this.state.calculatorsData.length !== 0) ?
                    <Stack direction="horizontal" className="reference-row">
                            <div className={"description"}>
                                Description
                            </div>

                            <div className="seperator">
                                <div className="vline"></div>
                            </div>

                            <div className="power-kw">
                                Power[KW]
                            </div>

                            <div className="seperator">
                                <div className="vline"></div>
                            </div>

                            <div className="cable">
                                Al / Cu
                            </div>

                            <div className="seperator">
                                <div className="vline"></div>
                            </div>

                            <div className="wire" style={{width: "8rem"}}>
                                Single / 3 Wire
                            </div>

                            <div className="seperator">
                                <div className="vline"></div>
                            </div>

                            <div className="ampacity">
                                Amp
                            </div>

                            <div className="seperator">
                                <div className="vline"></div>
                            </div>

                            <div className="results">
                                Reserve(%)

                            </div>
                            <div className="seperator">
                                <div className="vline"></div>
                            </div>
                            <div className="results">
                                Imax

                            </div>
                            <div className="seperator">
                                <div className="vline"></div>
                            </div>
                            <div className="results smm2">
                                S[mm^2]
                            </div>
                    </Stack >
                    : ""}








                <div className="calcs-list">
                    {this.state.calculatorsData.map((value, index) =>
                        <Calculator
                            key={index}
                            OnDeleteCalc={this.DeleteCalculator}
                            OnUpdateCalc={this.UpdateCalculator}
                            count={index + 1}
                            data={value}
                            factor={this.state.factor}
                        />)}
                </div>
                <br />

                <Stack direction="horizontal" gap={2} style={{ "justifyContent": "flex-end" }}>
                    <Button onClick={this.CalculateAll.bind(this)} disabled={this.state.calculatorsData.length == 0} variant="primary" size="lg" id="calculate_btn">Calculate</Button>
                    <Button disabled={!this.state.canSave} variant="primary" size="lg" id="save_calculation_btn">Save</Button>
                </Stack>
            </div>
        );
    }
}
export default CalculatorContainer;