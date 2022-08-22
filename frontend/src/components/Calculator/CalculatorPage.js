import React, { useState } from "react";
import Calculator from "./Calculator";
import { Form, Button, Stack, Modal, FloatingLabel } from "react-bootstrap";
import "./Calculator.scss";
import resetIcon from '../../Assets/reset.svg'

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

export default function CalculatorPage(props) {

    const [date, setDate] = useState(new Date());
    const [mainCalculatorValidated, setMainCalculatorValidated] = useState(false);
    const [calculators, setCalculators] = useState([]);
    const [canSave, setCanSave] = useState(false);
    const [showResetWarning, setShowResetWarning] = useState(false);
    const [customerData, setCustomerData] = useState({
        "name": "",
        "facility": "",
        "remarks": ""
    });

    const HandleChange = function (id, val) {
        setCustomerData((prev) => ({
            ...prev,
            [id]: val
        }));
    }

    const CalculateAll = function () {
        let newCalcsList = [];
        let factor = GetFactorCorrection();
        let canSaveCalculation = true;
        for (let calcData of calculators) {
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

        setCalculators([...newCalcsList]);
        setCanSave(canSaveCalculation);
    }

    const GetFactorCorrection = function () {
        const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
        return FACTOR_CORRECTION_VALUES[parseInt(clamp(calculators.length - 1, 0, 5))];
    }

    const AddCalculator = function (data) {
        let updated_calcs = [...calculators];

        // update the data to be correct with the current calc's index
        // let idx = updated_calcs.length + 1
        // if (data['wire'] !== "not selected")
        //     data[`wire`] = data[`wire`].substring(0, data['wire'].indexOf('#')) + '#' + idx
        // if (data['cable'] !== "not selected")
        //     data[`cable`] = data[`cable`].substring(0, data['cable'].indexOf('#')) + '#' + idx

        updated_calcs.push(data);
        setCalculators(updated_calcs);
    }

    const AddCalculators = function (data_array) {
        data_array.forEach(element => {
            AddCalculator(element);
        });
    }

    const UpdateCalculator = function (idx, data) {
        let newCalcList = calculators;
        newCalcList[idx] = data;
        setCalculators(newCalcList);
    }

    const DeleteCalculator = function (idx) {
        let calcsList = calculators;
        let newList = [];
        for (let index = 0; index < calcsList.length; index++) {
            if (index != idx) {
                newList.push(calcsList[index]);
            }
        }
        setCalculators([...newList]);
    }

    const OnAllCalcsReset = function () {
        setCalculators([]);
        setShowResetWarning(false);
    }

    return (
        <div className="main-container">
            <div className="customer-info">
                <Form>
                    <h5>{date.toLocaleDateString()}</h5>
                    <Stack direction="horizontal" gap={5}>
                        <FloatingLabel label="Customer" style={{ "flexGrow": 1 }}>
                            <Form.Control
                                type="text"
                                size="lg"
                                id="name"
                                placeholder={"Customer "}
                                required
                                value={customerData.name}
                                onChange={e => HandleChange(e.target.id, e.target.value)} />
                        </FloatingLabel>
                        <FloatingLabel label="Facility Name" style={{ "flexGrow": 1 }}>
                            <Form.Control
                                type="text"
                                size="lg"
                                id={"facility"}
                                placeholder={"Facility Name"}
                                required
                                value={customerData.facility}
                                onChange={e => HandleChange(e.target.id, e.target.value)} />
                        </FloatingLabel>
                    </Stack>
                    <FloatingLabel label="Remarks">
                        <Form.Control
                            type="text"
                            size="lg"
                            id={"remarks"}
                            placeholder={"Remarks"}
                            value={customerData.remarks}
                            onChange={e => HandleChange(e.target.id, e.target.value)} />
                    </FloatingLabel>
                </Form>
            </div>

            <br />

            <div className="calcs-list">
                <Calculator
                    key="main"
                    count={0}
                    editable={true}
                    addCalc={AddCalculator} />
            </div>

            <br />



            <br />

            <div>
                {(calculators.length !== 0) ?
                    <Stack direction="horizontal" className="reference-row">
                        <div style={{ flexGrow: "1" }}></div>
                        <div style={{ flexGrow: "1", textAlign: "center" }}>
                            Description
                        </div>

                        <div style={{ flexGrow: "1", textAlign: "center" }}>
                            Power[KW]
                        </div>

                        <div style={{ flexGrow: "1", textAlign: "center" }}>
                            Al / Cu
                        </div>

                        <div style={{ flexGrow: "1", textAlign: "center" }}>
                            Single / 3 Wire
                        </div>

                        <div style={{ flexGrow: "1", textAlign: "center" }}>
                            Amp
                        </div>

                        <div style={{ flexGrow: "1", textAlign: "center" }}>
                            Reserve(%)

                        </div>

                        <div style={{ flexGrow: "1", textAlign: "center" }}>
                            Imax

                        </div>

                        <div style={{ flexGrow: "1", textAlign: "center" }}>
                            S[mm^2]
                        </div>
                    </Stack >
                    : ""}

                <div className="calcs-list">
                    {calculators.map((value, index) =>
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
                        disabled={calculators.length === 0}
                        onClick={(e) => (setShowResetWarning(true))}>
                        <img className="icon" src={resetIcon}></img>
                        <span>Reset All</span>
                    </button>

                    <div style={{ "flexGrow": 1 }}></div>

                    <Button
                        onClick={CalculateAll}
                        disabled={calculators.length == 0}
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
                                <Button onClick={OnAllCalcsReset}>OK</Button>
                                <Button onClick={_e => { setShowResetWarning(false) }}>Cancel</Button>
                            </Stack>
                        </Modal.Body>
                    </div>
                </Modal>
            </div>
        </div>

    );

}


