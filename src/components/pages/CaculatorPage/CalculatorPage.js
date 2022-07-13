import React, { Component } from "react";
import Calculator from "../../comps/Calculator/Calculator";
import "./CalculatorPage.css";
import { Form, Container, Row, Col, Button, Stack } from "react-bootstrap";

class CalculatorPage extends Component {

    constructor(props) {
        super(props);
        this.main_calc_ref = React.createRef();
        this.OnDeleteCalc = this.OnDeleteCalc.bind(this);
    }

    state = {
        nowDate: new Date(),
        calculatorRepeatNumber: 0,
        arrCalculators: []
    }

    OnFocusBolderFont(ev) {
        this.setState({ name: "bold" });
    }

    OnFocusOut() {
        this.setState({ focus: "normal" });
    }


    //clicking on calculator adding to array in state
    OnAddCalculator() {
        const main_calc = this.main_calc_ref.current;
        let calcs = this.state.arrCalculators;
        calcs.push(main_calc.state)
        console.log(calcs)
        this.setState({ arrCalculators: calcs });
    }

    OnResetCalculator() {
        const main_calc = this.main_calc_ref.current;
        main_calc.ResetCalc()
    }

    OnDeleteCalc(idx) {
        let array = this.state.arrCalculators;
        array.splice(idx, 1);
        this.setState({arrCalculators: array});
    }

    CalculatorNumber() {
        let counter = this.state.calculatorRepeatNumber;
        for (let i = 0; i < counter; i++) {
            this.state.arrCalculators.push(i)
        }

    }





    render() {

        return (
            <Container fluid>
                <Container>
                    <Form className="customer-info">
                        <Row>
                            <Col>
                                <h5>{this.state.nowDate.toLocaleDateString()}</h5>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Control type="text" size="lg" name={"CustomerName"} placeholder={"Customer: "} />
                            </Col>
                            <Col>
                                <Form.Control type="text" size="lg" name={"facilityName"} placeholder={"Facility Name"} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Control type="text" size="lg" name={"Remarks"} placeholder={"Remarks"} />
                            </Col>
                        </Row>
                    </Form>
                    <br />
                    <Calculator ref={this.main_calc_ref} count={0}></Calculator>
                    <br />
                    <Row>
                        <Col md={10}>
                            <Button variant="light" size="lg" id="reset_calculation_btn" onClick={this.OnResetCalculator.bind(this)}>Reset</Button>
                        </Col>
                        <Col><Button size="lg" id="add_row_btn" onClick={this.OnAddCalculator.bind(this)}>Add Row</Button></Col>
                    </Row>
                    <br></br>
                    <Row>
                        <Col>
                            {this.state.arrCalculators.map((value, index, array) => <div><Calculator key={index} OnDeleteCalc={this.OnDeleteCalc} count={index + 1} data={value} /></div>)}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={10}></Col>
                        <Col>
                            <Stack direction="horizontal" gap={2}>
                                <Button variant="light" size="lg" id="calculate_btn">Calculate</Button>
                                <Button variant="primary" size="lg" id="save_calculation_btn">Save</Button>
                            </Stack>
                        </Col>

                    </Row>
                </Container>
            </Container>
        );

    }

}
export default CalculatorPage;