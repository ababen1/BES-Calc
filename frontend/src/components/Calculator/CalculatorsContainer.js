import React, { Component, useState } from "react";
import { Stack, Button, Modal } from "react-bootstrap";
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

export default function CalculatorContainer(props) {
    const [calcsData, setCalcsData] = useState([]);
    const [canSave, setCanSave] = useState(false);
    const [showResetWarning, setShowResetWarning] = useState(false);

    const CalculateAll = function () {
        let newCalcsList = [];
        let factor = this.GetFactorCorrection();
        let canSaveCalculation = true;
        for (let calcData of calcsData) {
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

        setCalcsData(newCalcsList);
        setCanSave(canSaveCalculation);
    }

    const GetFactorCorrection = function () {
        const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
        return FACTOR_CORRECTION_VALUES[parseInt(clamp(calcsData.length - 1, 0, 5))];
    }

    const AddCalculator = function (data) {
        let updated_calcs = calcsData;

        // update the data to be correct with the current calc's index
        // let idx = updated_calcs.length + 1
        // if (data['wire'] !== "not selected")
        //     data[`wire`] = data[`wire`].substring(0, data['wire'].indexOf('#')) + '#' + idx
        // if (data['cable'] !== "not selected")
        //     data[`cable`] = data[`cable`].substring(0, data['cable'].indexOf('#')) + '#' + idx

        updated_calcs.push(data);
        setCalcsData(updated_calcs);
    }

    const AddCalculators = function (data_array) {
        data_array.forEach(element => {
            AddCalculator(element);
        });
    }

    // UpdateCalculators(newCalcsData) {
    //     this.setState({ calculatorsData: [] }, () => { this.AddCalculators(newCalcsData) });
    // }

    const UpdateCalculator = function (idx, data) {
        let newCalcList = calcsData;
        newCalcList[idx] = data;
        setCalcsData(newCalcList);
    }

    const DeleteCalculator = function (idx) {
        let calcsList = calcsData;
        let newList = [];
        for (let index = 0; index < calcsList.length; index++) {
            if (index != idx) {
                newList.push(calcsList[index]);
            }
        }
        setCalcsData(newList);
    }

    const OnResetAll = function () {
        setCalcsData([]);
        setShowResetWarning(false);
    }

    return (
        <div>
            {(calcsData.length !== 0) ?
                <Stack direction="horizontal" className="reference-row">
                    <div style={{ width: "3rem" }}></div>
                    <div style={{ width: "400px", textAlign: "center" }}>
                        Description
                    </div>

                    <div style={{ width: "130px", textAlign: "center" }}>
                        Power[KW]
                    </div>

                    <div style={{ width: "130px", textAlign: "center" }}>
                        Al / Cu
                    </div>

                    <div style={{ width: "200px", textAlign: "center" }}>
                        Single / 3 Wire
                    </div>

                    <div style={{ width: "169px", textAlign: "center" }}>
                        Amp
                    </div>

                    <div style={{ width: "137px", textAlign: "center" }}>
                        Reserve(%)

                    </div>

                    <div style={{ width: "137px", textAlign: "center" }}>
                        Imax

                    </div>

                    <div style={{ width: "137px", textAlign: "center" }}>
                        S[mm^2]
                    </div>
                </Stack >
                : ""}

            <div className="calcs-list">
                {calcsData.map((value, index) =>
                    <Calculator
                        key={index}
                        OnDeleteCalc={DeleteCalculator}
                        OnUpdateCalc={UpdateCalculator}
                        count={index + 1}
                        data={value}
                        editable={false}
                    />)}
            </div>

            <br />

            <Stack direction="horizontal" gap={2} style={{ "justifyContent": "flex-end" }}>
                <button
                    className="reset-btn"
                    size="lg"
                    disabled={calcsData.length === 0}
                    onClick={(e) => (setShowResetWarning(true))}>
                    <span className="icon"></span>
                    <span>Reset All</span>
                </button>

                <div style={{ "flexGrow": 1 }}></div>

                <Button
                    onClick={CalculateAll}
                    disabled={calcsData.length == 0}
                    variant="primary"
                    size="lg"
                    id="calculate_btn">Calculate
                </Button>
                <Button
                    disabled={!canSave}
                    variant="primary"
                    size="lg"
                    id="save_calculation_btn">Save
                </Button>
            </Stack>

            <Modal onHide={e => { setShowResetWarning(false) }} show={showResetWarning}>
                <div className="reset-all-confirmation">
                    <Modal.Title>
                        Reset all calculators?
                    </Modal.Title>
                    <Modal.Body>
                        <Stack direction="horizontal" gap={5}>
                            <button onClick={OnResetAll}>OK</button>
                            <button onClick={_e => { setShowResetWarning(false) }}>Cancel</button>
                        </Stack>
                    </Modal.Body>
                </div>
            </Modal>
        </div>
    );
}

