import React, { Component } from "react";
import "./Calculator.scss";
import { ListGroup, Row, Form, FormControl, Container, InputGroup, CloseButton } from "react-bootstrap";

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

class Calculator extends Component {

    constructor(props) {
        super(props);
        this.calc_form = React.createRef();
        this.state = this.getInitialState();
        this.Update = this.Update.bind(this);
    }

    componentDidMount() {
        this.setState(this.props.data);
    }

    // componentDidUpdate(prevProps) {
    //     if (prevProps.factor !== this.props.factor) {
    //         this.setState({ factor: this.props.factor });
    //     }
    // }

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

    Update() {
        if (this.props.OnUpdateCalc) {
            this.props.OnUpdateCalc(this.props.count - 1, this.state);
        }
    }

    OnChangeHandlerDescription(ev) {
        this.setState({ description: ev.target.value }, this.Update);
    }

    OnChangeHandlerAmp(ev) {
        this.setState({ ampacity: ev.target.value }, this.Update);
    }

    OnWireChange(ev) {
        this.setState({ "wire": ev.target.id }, this.Update);
    }

    OnCableChange(ev) {
        this.setState({ "cable": ev.target.id }, this.Update);
    }

    render() {
        return (
            <div className="calculator">
                <Form ref={this.calc_form} onSubmit={(e) => e.preventDefault()}>
                    <ListGroup horizontal>
                        <div className="calc-number">
                            <span >{(this.props.count === 0) ? "+" : this.props.count}</span>
                        </div>
                        <ListGroup.Item className={"description"}>
                            <Form.Control as="textarea"
                                type="text" value={this.state.description}
                                onChange={this.OnChangeHandlerDescription.bind(this)}
                                placeholder={"Description"} />
                        </ListGroup.Item>

                        <ListGroup.Item className="power-kw">
                            <Form.Select
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
                        <ListGroup.Item className="cable">
                            <InputGroup>
                                <Form.Check
                                    name="cable"
                                    inline
                                    id={`al#${this.props.count}`}
                                    label="Al"
                                    type="radio"
                                    checked={this.state.cable === `al#${this.props.count}`} onChange={this.OnCableChange.bind(this)} />
                                <Form.Check
                                    name="cable"
                                    inline
                                    id={`cu#${this.props.count}`}
                                    label="Cu"
                                    type="radio"
                                    checked={this.state.cable === `cu#${this.props.count}`}
                                    onChange={this.OnCableChange.bind(this)} />
                            </InputGroup>


                        </ListGroup.Item>
                        <ListGroup.Item className="wire">
                            <InputGroup>
                                <Form.Check
                                    name="wire"
                                    inline
                                    id={`single#${this.props.count}`}
                                    label="Single"
                                    type="radio"
                                    checked={this.state.wire === `single#${this.props.count}`}
                                    onChange={this.OnWireChange.bind(this)} />
                                <Form.Check
                                    name="wire"
                                    inline
                                    id={`3-wire#${this.props.count}`}
                                    label="3 Wire"
                                    type="radio"
                                    checked={this.state.wire === `3-wire#${this.props.count}`}
                                    onChange={this.OnWireChange.bind(this)} />
                            </InputGroup>

                        </ListGroup.Item>
                        <ListGroup.Item className="ampacity">
                            <Form.Control
                                type={"number"}
                                name={"ampacity"}
                                placeholder={"Ampacity"}
                                value={this.state.ampacity}
                                onChange={this.OnChangeHandlerAmp.bind(this)} />

                        </ListGroup.Item>
                        <ListGroup.Item className="results">
                            <p className="data-result-title">Reserve(%)</p>
                            <p className="data-result-text">{String(this.state.reserve).substring(0, 8)}</p>
                        </ListGroup.Item>
                        <ListGroup.Item className="results">
                            <p className="data-result-title">Imax</p>
                            <p className="data-result-text">{String(this.state.imax).substring(0, 8)}</p>
                        </ListGroup.Item>
                        <ListGroup.Item className="results">
                            <p className="data-result-title">S[mm^2]</p>
                            <p className="data-result-text">{String(this.state.smm2)}</p>

                        </ListGroup.Item>
                        {(this.props.count !== 0) ?
                            <div className="delete-row">
                                <CloseButton onClick={this.props.OnDeleteCalc.bind(this, this.props.count - 1)}></CloseButton>
                            </div > : ""}

                    </ListGroup>
                </Form>
            </div >

        );
    }
}
export default Calculator;