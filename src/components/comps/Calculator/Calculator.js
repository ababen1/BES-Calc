import {Component} from "react";
import "./calculator.css";
class Calculator extends Component {

    state = {description: "", ampacity: ""};

    OnChangeHandler(ev) {
        this.setState(prevstate=>({...prevstate,[ev.target.name]: [ev.target.value]}));
    }

    Calculation()
    {

    }


    render() {
            return (
                <div>

                    <div className={"calculator  row"}>
                        <div style={{backgroundColor: (this.props.count === 0) ? "lightgray" : "#156982"}}
                             className={"add col-1"}>
                            {(this.props.count === 0) ? "+" : this.props.count}
                        </div>
                        <div className={"description col-1"}>
                            <input value={this.state.description} type={"text"} name={"description"} onChange={this.OnChangeHandler.bind(this)} className={"form-control calculator-input"} placeholder={"Description"}/>
                        </div>

                        <div className={"input kilo-w col-1"}>
                            <select className={"KW"}>
                                <option>power KW</option>

                            </select>

                        </div>
                        <div className={"input al-cu  col-1"}>
                            <span>AI</span>
                            <label className="switch">
                                <input type="checkbox"/>
                                <span className="slider round"></span>
                            </label>
                            <span>Cu</span>

                        </div>
                        <div className={"input al-cu col-1"}>
                            <span>3 Wire</span>
                            <label className="switch">
                                <input type="checkbox"/>
                                <span className="slider round"></span>
                            </label>
                            <span>Single</span>

                        </div>
                        <div className={"input data gray-text col-1"}>
                            <input value={this.state.ampacity} onChange={this.OnChangeHandler.bind(this)} type={"number"} name={"ampacity"} placeholder={"Ampacity"} className={"form-control"} />

                        </div>
                        <div className={"input data gray-text col-1"}>
                            <p>Reserve(%)</p>

                        </div>
                        <div className={"input col-1 gray-text data"}>
                            <p>Imax</p>

                        </div>
                        <div className={"input col-1 gray-text data"}>
                            <p>S[Mm^2]</p>

                        </div>

                    </div>

                </div>

            );


    }

}
export default Calculator;