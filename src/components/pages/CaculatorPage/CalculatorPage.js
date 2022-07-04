import { Component } from "react";
import Calculator from "../../comps/Calculator/Calculator";
import "./CalculatorPage.css";
import { Form, Container, Row, Col, Button, Stack } from "react-bootstrap";

class CalculatorPage extends Component {

    state = { nowDate: new Date(), calculatorRepeatNumber: 0, arrCalculator: [], arrCalculatorNumber: [], focusInputOne: "normal", focusInputTwo: "normal", focusInputThree: "normal", ampacity: 0 }

    OnFocusBolderFont(ev) {
        this.setState({ name: "bold" });
    }

    OnFocusOut() {
        this.setState({ focus: "normal" });
    }


    //clicking on calculator adding to array in state
    OnClickCalculator() {
        let arr = [];
        let counter = this.state.calculatorRepeatNumber;
        counter += 1;
        this.setState({ calculatorRepeatNumber: counter });

        for (let i = 0; i <= this.state.calculatorRepeatNumber; i++) {
            arr.push(<Calculator count={i} />);
        }
        this.setState({ arrCalculatorNumber: arr });

    }

    CalculatorNumber() {
        let counter = this.state.calculatorRepeatNumber;
        for (let i = 0; i < counter; i++) {
            this.state.arrCalculatorNumber.push(i)
        }

    }

    //displaying calculators




    render() {

        return (
            <Container>
                <Row>
                    <Col>

                        <h3>{this.state.nowDate.toLocaleDateString()}</h3>

                    </Col>
                </Row>
                <Form>
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
                    <Row>
                        <Col>
                            {this.state.arrCalculatorNumber.map((value, index, array) => <div><Calculator key={index} count={index + 1} /></div>)}
                            <div onClick={this.OnClickCalculator.bind(this)}>
                                <Calculator count={0} />
                            </div>
                        </Col>

                    </Row>

                    <Row>
                        <Col>
                            <Stack direction="horizontal" gap={"3"}>
                                <Button variant="light" size="lg" id="calculate_btn">Calculate</Button>
                                <Button variant="light" size="lg" id="save_calculation_btn">Save</Button>
                            </Stack>
                        </Col>

                    </Row>
                </Form>

            </Container>
        );

    }

}
export default CalculatorPage;