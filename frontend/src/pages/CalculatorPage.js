import React, { useEffect, useState } from "react";
import Calculator from "components/Calculator/Calculator";
import { Form, Button, Stack, Modal, FloatingLabel } from "react-bootstrap";
import resetIcon from 'Assets/reset.svg'
import 'scss/Calculator.scss'
import 'utils/calculationsUtils'
import axios from "axios";
import { AddCalculator, Calculate, DeleteCalculator, UpdateCalculator } from "utils/calculationsUtils";

export default function CalculatorPage(props) {

    const [date, setDate] = useState(new Date());
    const [calculators, setCalculators] = useState([]);
    const [canSave, setCanSave] = useState(false);
    const [showResetWarning, setShowResetWarning] = useState(false);
    const [customerData, setCustomerData] = useState({
        "name": "",
        "facility": "",
        "remarks": ""
    });

    useEffect(() => {
        if (props.isLoaded) {
            setCustomerData(props.customerData)
            setCalculators(props.calculatorsData)
        }
    }, [props.isLoaded])

    // Event handlers 
    const OnAllCalcsReset = function () {
        setCalculators([]);
        setShowResetWarning(false);
    }

    const OnAddCalculator = function (data) {
        setCalculators(AddCalculator(calculators, data));
        setCanSave(false);
    }

    const OnDeleteCalculator = function (idxToDelete) {
        setCalculators(DeleteCalculator(calculators, idxToDelete));
        setCanSave(false);
    }

    const OnUpdateCalculator = function (idxToUpdate, data) {
        setCalculators(UpdateCalculator(calculators, idxToUpdate, data))
    }

    const OnCalculate = function () {
        console.log("old: ", calculators)
        setCalculators(Calculate(calculators));
        console.log("new: ", calculators)
        setCanSave(true);
    }

    const UpdateCustomerData = function (id, val) {
        setCustomerData((prev) => ({
            ...prev,
            [id]: val
        }));
    }

    const handleSave = function () {
        if (!canSave) {
            alert("Please add rows and press 'calculate' before saving");
            return
        }

        var config = {
            method: "POST",
            base_url: "localhost:8080",
            url: "/calculations",
            headers: {
                "token": sessionStorage.getItem("token")
            },
            data: {
                userId: props.userdata.id,
                customerData: customerData,
                calculatorsData: calculators,
                date: date,
            }
        }
        axios(config).then((response) => {
            if (response.data.success) {
                alert("Calculation Saved");
            } else {
                alert(response.data.error)
            }
        })
    }

    // Forms & Components
    const customerForm = (
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
                        onChange={e => UpdateCustomerData(e.target.id, e.target.value)} />
                </FloatingLabel>
                <FloatingLabel label="Facility Name" style={{ "flexGrow": 1 }}>
                    <Form.Control
                        type="text"
                        size="lg"
                        id={"facility"}
                        placeholder={"Facility Name"}
                        required
                        value={customerData.facility}
                        onChange={e => UpdateCustomerData(e.target.id, e.target.value)} />
                </FloatingLabel>
            </Stack>
            <FloatingLabel label="Remarks">
                <Form.Control
                    type="text"
                    size="lg"
                    id={"remarks"}
                    placeholder={"Remarks"}
                    value={customerData.remarks}
                    onChange={e => UpdateCustomerData(e.target.id, e.target.value)} />
            </FloatingLabel>
        </Form>
    )

    const referenceRow = (
        <Stack direction="horizontal" className="reference-row">
            <div style={{ "flexGrow": "1" }}>

            </div>
            <div className="description long ref-row-item">
                Description
            </div>

            <div className="power-kw ref-row-item">
                Power[KW]
            </div>

            <div className="cable ref-row-item">
                Al / Cu
            </div>

            <div className="wire ref-row-item">
                Single / 3 Wire
            </div>

            <div className="ampacity ref-row-item">
                Ampacity
            </div>

            <div className="results reserve ref-row-item">
                Reserve(%)
            </div>

            <div className="results imax ref-row-item">
                Imax
            </div>

            <div className="results smm2 ref-row-item">
                S[Mm^2]
            </div>
            <div style={{ "flexGrow": "1" }}>

            </div>
        </Stack >)

    const resetWarning = (
        <Modal onHide={() => { setShowResetWarning(false) }} show={showResetWarning}>
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
    )

    return (
        <div className="main-container">
            <div className="customer-info">
                {customerForm}
            </div>

            <br />

            <div className="round-corners">
                <Calculator
                    key="main"
                    count={0}
                    editable={true}
                    addCalc={OnAddCalculator} />
            </div>

            <br />

            <div>
                {(calculators.length !== 0) ? referenceRow : ""}

                <div className="round-corners">
                    {calculators.map((value, index) =>
                        <Calculator
                            key={index}
                            OnDeleteCalc={OnDeleteCalculator}
                            OnUpdateCalc={OnUpdateCalculator}
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
                        onClick={() => (setShowResetWarning(true))}>
                        <img className="icon" src={resetIcon}></img>
                        <span>Reset All</span>
                    </button>

                    <div style={{ "flexGrow": 1 }}></div>

                    <Button
                        onClick={OnCalculate}
                        disabled={calculators.length == 0}
                        variant="primary"
                        size="lg"
                        id="calculate_btn">Calculate
                    </Button>
                    <Button
                        disabled={!canSave}
                        variant="primary"
                        size="lg"
                        id="save_calculation_btn"
                        onClick={handleSave}>Save
                    </Button>
                </Stack>

                {resetWarning}

            </div>
        </div>
    );
}