import {Component} from "react";
import "./calculator.css";
class Calculator extends Component
{
    state ={};
    render()
    {
        return(
            <div>
                <div className={"calculator row"}>
                    <div className={"add col-1"}>
                        +
                    </div>
                    <div className={"description col-1"}>
                        <input className={"form-control calculator-input"} placeholder={"Description"}  />
                    </div>
                    <div className={"kilo-w col-1"}>
                        <select className={"KW"}>
                            <option>power KW</option>

                        </select>
                    </div>
                        <div className={"al-cu col-1"}>
                            <label>AI</label>
                            <label className="switch">
                                <input type="checkbox" />
                                    <span className="slider round"></span>
                            </label>
                            <label>Cu</label>

                        </div>
                    <div className={"al-cu col-1"}>
                        <label>3 Wire</label>
                        <label className="switch">
                            <input type="checkbox" />
                            <span className="slider round"></span>
                        </label>
                        <label>Single</label>

                    </div>
                    <div className={"data col-1"}>
                       Reserve
                    </div>
                    <div className={"col-1 data"}>
                        Imax
                    </div>
                    <div className={"col-1 data"}>
                        s[mm^2]
                    </div>
                </div>

            </div>

        );
    }
}
export default Calculator;