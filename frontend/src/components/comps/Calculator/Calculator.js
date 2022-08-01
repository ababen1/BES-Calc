import React, { Component } from "react";
import "./Calculator.scss";
import { ListGroup, Form, FormControl, Container, InputGroup, CloseButton } from "react-bootstrap";

const IMAX_VALUES = {
    111: 5 * 16,
    143: 3 * 25 + 16,
    173: 3 * 35 + 16,
    205: 3 * 50 + 25,
    252: 3 * 70 + 35,
    303: 3 * 95 + 50,
    346: 3 * 120 + 70,
    390: 3 * 150 + 70,
    441: 3 * 185 + 95,
    551: 3 * 240 + 120
}

class Calculator extends Component {

    constructor(props) {
        super(props);
        this.calc_form = React.createRef();
        this.state = this.getInitialState();
    }

    componentDidMount() {
        this.setState(this.props.data);
        console.log(this.props.factor)
    }

    getInitialState() {
        return {
            description: "",
            ampacity: "",
            power: "",
            cable: "",
            wire: "",
            imax: "",
            reserve: "",
            smm2: "",
        }
    }

    ResetCalc() {
        this.setState(this.getInitialState());
    }

    OnChangeHandlerDescription(ev) {
        this.setState({ description: ev.target.value });
    }

    OnChangeHandlerAmp(ev) {
        this.setState({ ampacity: ev.target.value }, this.Calculation);
    }

    Calculation() {
        let imax = this.CalculateIMAX();
        let reserve = (Math.abs(this.state.ampacity - imax) / imax) * 100;
        let smm2 = this.CalculateSmm2(imax);
        this.setState({ imax: imax * (this.props.factor == undefined ? 1 : this.props.factor), reserve: reserve, smm2: smm2 })
    }

    OnWireChange(ev) {
        this.setState({ "wire": ev.target.id })
    }

    OnCableChange(ev) {
        this.setState({ "cable": ev.target.id })
    }

    CalculateIMAX() {
        const imaxValues = Object.keys(IMAX_VALUES)
        let imax;
        if (isNaN(this.state.ampacity)) {
            return
        }

        // steps to calculate imax:
        // 1. copy the imaxValues array and insert the user's input (amp) into it
        // 2. sort the copied array, and get the index of amp
        // 3. if amp is not the last element or the first element: 
        //      the target imax is neither the prvious item or the next item in the copied array. we take the one that is closest to the user's
        //      input, rounded down.
        // 4. otherwise:
        //      the target imax is the smallest/largest value in the imaxValues array (smallest if index is 0 and vice versa)
        imax = parseFloat(this.state.ampacity);
        let tempCopy = [...imaxValues]
        tempCopy.push(imax)
        tempCopy = tempCopy.sort((a, b) => a - b);
        let index = Math.min(tempCopy.indexOf(imax), imaxValues.length - 1)
        if (index === 0 || index === imaxValues.length - 1) {
            imax = imaxValues[index]
        } else {
            let prevImax = tempCopy[index - 1]
            let nextImax = tempCopy[index + 1]
            if (Math.abs(this.state.ampacity - prevImax) <= Math.abs(this.state.ampacity - nextImax)) {
                imax = prevImax
            } else {
                imax = nextImax
            }
        }
        return imax
    }

    CalculateSmm2(imax) {
        return parseFloat(IMAX_VALUES[parseFloat(imax)])
    }

    render() {
        return (
            <Container fluid className="calculator" style={{}}>
                <Form ref={this.calc_form} onSubmit={(e) => e.preventDefault()}>
                    <ListGroup horizontal>
                        <ListGroup.Item style={{ "background-color": "#156982" }}>
                            <span className="add">{(this.props.count === 0) ? "+" : this.props.count}</span>
                        </ListGroup.Item>
                        <ListGroup.Item >
                            <Form.Control as="textarea"
                                type="text" value={this.state.description}
                                className={"description"}
                                onChange={this.OnChangeHandlerDescription.bind(this)}
                                placeholder={"Description"} />
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Form.Select
                                className="power-kw"
                                value={this.state.power}
                                onChange={(ev) => { this.setState({ "power": ev.target.value }); }}>
                                <option>power KW</option>
                                <option>15</option>
                                <option>18.5</option>
                                <option>22</option>
                                <option>30</option>
                                <option>37</option>
                                <option>45</option>
                                <option>55</option>
                                <option>75</option>
                                <option>90</option>
                                <option>110</option>
                                <option>132</option>
                                <option>160</option>
                                <option>200</option>
                                <option>250</option>
                                <option>280</option>
                                <option>315</option>
                                <option>355</option>
                            </Form.Select>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <InputGroup className="radio-btns">
                                <Form.Check
                                    name="cable"
                                    inline
                                    id={`al-${this.props.count}`}
                                    label="Al"
                                    type="radio"
                                    checked={this.state.cable === `al-${this.props.count}`} onChange={this.OnCableChange.bind(this)} />
                                <Form.Check
                                    name="cable"
                                    inline
                                    id={`cu-${this.props.count}`}
                                    label="Cu"
                                    type="radio"
                                    checked={this.state.cable === `cu-${this.props.count}`}
                                    onChange={this.OnCableChange.bind(this)} />
                            </InputGroup>


                        </ListGroup.Item>
                        <ListGroup.Item>
                            <InputGroup className="radio-btns">
                                <Form.Check
                                    name="wire"
                                    inline
                                    id={`single-${this.props.count}`}
                                    label="Single"
                                    type="radio"
                                    checked={this.state.wire === `single-${this.props.count}`}
                                    onChange={this.OnWireChange.bind(this)} />
                                <Form.Check
                                    name="wire"
                                    inline
                                    id={`3-wire-${this.props.count}`}
                                    label="3 Wire"
                                    type="radio"
                                    checked={this.state.wire === `3-wire-${this.props.count}`}
                                    onChange={this.OnWireChange.bind(this)} />
                            </InputGroup>

                        </ListGroup.Item>
                        <ListGroup.Item>
                            <FormControl
                                className="ampacity"
                                type={"number"}
                                name={"ampacity"}
                                placeholder={"Ampacity"}
                                value={this.state.ampacity}
                                onChange={this.OnChangeHandlerAmp.bind(this)} />

                        </ListGroup.Item>
                        <ListGroup.Item>
                            <p className="data-result-title">Reserve(%)</p>
                            <p className="data-result-text">{String(this.state.reserve).substring(0, 8)}</p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <p className="data-result-title">Imax(%)</p>
                            <p className="data-result-text">{String(this.state.imax)}</p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <p className="data-result-title">S[mm^2] (%)</p>
                            <p className="data-result-text">{String(this.state.smm2)}</p>

                        </ListGroup.Item>
                        {(this.props.count !== 0) ?
                            <ListGroup.Item>
                                <CloseButton onClick={this.props.OnDeleteCalc.bind(this, this.props.count - 1)}></CloseButton>
                            </ListGroup.Item > : ""}
                    </ListGroup>
                </Form>
            </Container>
        );
    }
}
export default Calculator;