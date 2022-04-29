import {Component} from "react";
import "./calculator.css";
class Calculator extends Component {

    state = {description: ""};

    OnChangeHandler(ev) {
        this.setState({description: ev.target.value})
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
                            <input name={"description"} onChange={this.OnChangeHandler.bind(this)}
                                   className={"form-control calculator-input"} placeholder={"Description"}/>
                            <hr className={"rule-line"}/>
                        </div>

                        <div className={"input kilo-w col-1"}>
                            <select className={"KW"}>
                                <option>power KW</option>

                            </select>
                            <hr className={"rule-line"}/>

                        </div>
                        <div className={"input al-cu  col-1"}>
                            <label>AI</label>
                            <label className="switch">
                                <input type="checkbox"/>
                                <span className="slider round"></span>
                            </label>
                            <label>Cu</label>
                            <hr className={"rule-line"}/>

                        </div>
                        <div className={"input al-cu col-1"}>
                            <label>3 Wire</label>
                            <label className="switch">
                                <input type="checkbox"/>
                                <span className="slider round"></span>
                            </label>
                            <label>Single</label>
                            <hr className={"rule-line-2"}/>

                        </div>
                        <div className={"input data gray-text col-1"}>
                            <input className={"form-control "} placeholder={"Reserve(%)"}/>
                            <hr className={"rule-line"}/>

                        </div>
                        <div className={"input col-1 gray-text data"}>
                            <input className={"form-control "} placeholder={"Imax"}/>
                            <hr className={"rule-line"}/>

                        </div>
                        <div className={"input col-1 gray-text data"}>
                            <input className={"form-control "} placeholder={"S[Mm^2]"}/>
                            <hr className={"rule-line"}/>

                        </div>

                    </div>

                </div>

            );


    }

}
export default Calculator;