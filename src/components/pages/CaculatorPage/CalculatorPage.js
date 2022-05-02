import {Component} from "react";
import Calculator from "../../comps/Calculator/Calculator";
import Section from "../../comps/Section";
import "./CalculatorPage.css";
import logo from "../../../Assets/Group 35.svg";
import loginImage from "../../../Assets/login_icon.svg";
class CalculatorPage extends Component
{

    state = {nowDate:new  Date(), calculatorRepeatNumber: 0,arrCalculator:[], arrCalculatorNumber:[]  ,focusInputOne:"normal", focusInputTwo: "normal", focusInputThree:"normal", ampacity:0}

    OnFocusBolderFont(ev)
    {
        this.setState({name:"bold"});
    }

    OnFocusOut(){
        this.setState({focus:"normal"});
    }


//clicking on calculator adding to array in state
    OnClickCalculator()
    {
        let arr = [];
        let counter = this.state.calculatorRepeatNumber;
        counter += 1;
        this.setState({calculatorRepeatNumber: counter});

        for (let i = 0; i <= this.state.calculatorRepeatNumber; i++) {
            arr.push(<Calculator  count={i}/>);
        }
        this.setState({arrCalculatorNumber: arr});

    }

    CalculatorNumber()
    {
        let  counter = this.state.calculatorRepeatNumber;
        for(let i=0; i<counter; i++)
        {
            this.state.arrCalculatorNumber.push(i)
        }

    }

    //displaying calculators




    render(){

        return (

            <div className="App" >

                <div className={"container"}>

                    <Section bg={"white"} color={"black"} content={<img src={logo} className={"logo"} title={"BES"} alt={"BES"}  /> } info={<h1>Electric Cables Cross Section Calculations</h1>} loginIcon={ <img src={loginImage}  className={"login-icon"} width={67} height={64} alt="Login" title={"Login"} />} title={<span>login</span>} />

                    <div className={"row"}>
                        <div className={"col-12"}>

                            <h3>{this.state.nowDate.toLocaleDateString()}</h3>

                        </div>
                    </div>

                    <div className={"row"}>
                        <div className={"col-6"}>
                            <input name={"CustomerName"} onFocus={(e)=>{this.OnFocusBolderFont()}} onMouseOut={()=>{this.OnFocusOut()}} style={{fontWeight:this.state.focusInputOne}} className={"form-control"} placeholder={" Customer Name"} />
                        </div>
                        <div className={"col-6"}>
                            <input name={"facilityName"} onFocus={this.OnFocusBolderFont.bind(this)} onMouseOut={this.OnFocusOut.bind(this)} style={{fontWeight:this.state.focusInputThree}}  className={"form-control"} placeholder={"Facility Name"} />
                        </div>

                    </div>
                    <div className={"row"}>
                        <div className={"col-12"}>
                            <input name={"Remarks"} onFocus={this.OnFocusBolderFont.bind(this)} onMouseOut={this.OnFocusOut.bind(this)}  className={"form-control"} style={{width: "100%", fontWeight:this.state.focusInputThree}} placeholder={"Remarks"} />
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-12"} >
                            {this.state.arrCalculatorNumber.map((value, index, array) => <div><Calculator  key={index} count={index+1} /></div>)}
                            <div  className={"col-12"} onClick={this.OnClickCalculator.bind(this)}>
                                <Calculator  count={0}/>
                            </div>
                        </div>

                    </div>

                    <div className={"row"}>
                        <div className={"col-12 space "}>

                            <button   className={"btn-secondary-disabled total-left"} type={"button"}>Calculate</button>
                            <button className={"btn-secondary"} type={"button"}>Save</button>
                        </div>

                    </div>

                </div>
            </div>
        );

    }

}
export default CalculatorPage;