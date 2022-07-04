import { Component } from "react";
import "./calculator.css";
import loginClose from "../../../Assets/login close icon.svg";
import { Row, Col, Button, ListGroup, Form, FormControl } from "react-bootstrap";

class Calculator extends Component {

    state = { description: "", ampacity: "", ampacityResult: 0 };


    OnClickDelete() {


    }

    OnChangeHandlerDescription(ev) {
        this.setState({ description: ev.target.value });
    }

    OnChangeHandlerImax(ev) {
        this.setState({ ampacity: ev.target.value });
    }
    Calculation() {
        let ampacityArr = [111, 143, 173, 205, 252, 303, 346, 390, 441, 511];
        let imax = parseFloat(this.state.ampacity);
        let calculationAmpacity = 0;
        for (let i = 0; i < ampacityArr.length; i++) {
            if (imax > ampacityArr[i]) {
                calculationAmpacity = ampacityArr[i + 1];
                this.setState({ ampacityResult: calculationAmpacity });
            }
            if (imax === ampacityArr[i]) {
                this.setState({ ampacityResult: ampacityArr[i] });
            }

        }

    }


    render() {
        return (
            <Form>
                <ListGroup horizontal className="calculator">
                    <ListGroup.Item className={"add"} style={{ backgroundColor: (this.props.count === 0) ? "lightgray" : "#156982" }}>
                        <span style={{ color: "white", verticalAlign: "middle" }}>{(this.props.count === 0) ? "+" : this.props.count}</span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Form.Control as="textarea" style={{"overflow": "auto", "resize": "none"}} type="text" value={this.state.description} name={"description"} onChange={this.OnChangeHandlerDescription.bind(this)} placeholder={"Description"} />
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Form.Select>
                            <option>power KW</option>

                        </Form.Select>

                    </ListGroup.Item>
                    <ListGroup.Item>
                        <span>AI</span>
                        <label className="switch">
                            <input type="checkbox" />
                            <span className="slider round"></span>
                        </label>
                        <span>Cu</span>

                    </ListGroup.Item>
                    <ListGroup.Item>
                        <span>3 Wire</span>
                        <label className="switch">
                            <input type="checkbox" />
                            <span className="slider round"></span>
                        </label>
                        <span>Single</span>

                    </ListGroup.Item>
                    <ListGroup.Item>
                        <FormControl type={"number"} name={"ampacity"} placeholder={"Ampacity"} value={this.state.ampacity} onFocus={this.Calculation.bind(this)} onChange={this.OnChangeHandlerImax.bind(this)}/>

                    </ListGroup.Item>
                    <ListGroup.Item>
                        <p>Reserve(%)</p>

                    </ListGroup.Item>
                    <ListGroup.Item>

                        <p>{(this.state.ampacityResult !== 0) ? this.state.ampacityResult : "Imax"}</p>

                    </ListGroup.Item>
                    <ListGroup.Item>
                        <p>S[Mm^2]</p>

                    </ListGroup.Item>
                    <ListGroup.Item >
                        {(this.props.count !== 0) ? <div className="delete-element"><img src={loginClose} alt={"delete"} width={"10px"} height={"10px"} /></div> : ""}
                    </ListGroup.Item>
                </ListGroup>
            </Form>
        );
    }
}
export default Calculator;