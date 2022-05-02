import {Component} from "react";
import "./calculator.css";
import loginClose from "../../../Assets/login close icon.svg";
class Calculator extends Component {

    state = {description: "", ampacity: "", ampacityResult:0};


    OnClickDelete()
    {


    }

    OnChangeHandlerDescription(ev) {
        this.setState({description: ev.target.value});
    }

    OnChangeHandlerImax(ev){
        this.setState({ampacity: ev.target.value});
    }
    Calculation()
    {
        let ampacityArr = [111, 143, 173, 205, 252, 303, 346, 390, 441, 511];
        let imax = parseFloat(this.state.ampacity);
        let calculationAmpacity = 0;
        for(let i=0; i<ampacityArr.length; i++)
        {
            if(imax>ampacityArr[i])
            {
               calculationAmpacity = ampacityArr[i+1];
                this.setState({ampacityResult:calculationAmpacity});
            }
            if(imax === ampacityArr[i])
            {
                this.setState({ampacityResult: ampacityArr[i]});
            }

        }

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
                            <input value={this.state.description} type={"text"} name={"description"} onChange={this.OnChangeHandlerDescription.bind(this)} className={"form-control calculator-input"} placeholder={"Description"}/>
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
                            <input value={this.state.ampacity} onFocus={this.Calculation.bind(this)} onChange={this.OnChangeHandlerImax.bind(this)} type={"number"} name={"ampacity"} placeholder={"Ampacity"} className={"form-control"} />

                        </div>
                        <div className={"input data gray-text col-1"}>
                            <p>Reserve(%)</p>

                        </div>
                        <div className={"input col-1 gray-text data"}>

                            <p>{(this.state.ampacityResult !== 0 )?this.state.ampacityResult:"Imax"}</p>

                        </div>
                        <div className={"input col-1 gray-text data"}>
                            <p>S[Mm^2]</p>

                        </div>
                        {(this.props.count !== 0)? <div className={" delete-element"}><img src={loginClose} alt={"delete"} width={"10px"} height={"10px"}  /></div>:""}
                    </div>

                </div>

            );


    }

}
export default Calculator;