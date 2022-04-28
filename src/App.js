import './App.css';
import {Component, lazy, Suspense} from "react";
import LoginSignUp from "./components/comps/Modal/LoginSignUp";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';
import  logo from "./Assets/Group 35.svg";
import {calculateNewValue} from "@testing-library/user-event/dist/utils";
const  Section = lazy(() =>{return new Promise(resolve => {setTimeout (()=> resolve(import("./components/comps/Section")),2500)});
});
const  Calculator = lazy(() =>{return new Promise(resolve => {setTimeout (()=> resolve(import("./components/comps/Calculator/Calculator")),2500)});
});
class App extends Component{

    state = {nowDate:new  Date(), calculatorRepeatNumber: 0,arrCalculator:[] ,focusInputOne:"normal", focusInputTwo: "normal", focusInputThree:"normal", ampacity:0}

OnFocusBolderFont(ev)
{
    this.setState({name:"bold"});
}

OnFocusOut(){
        this.setState({focus:"normal"});
}

//clicking on calculator adding to arrray in state
OnClickCalculator()
{
    let counter = this.state.calculatorRepeatNumber;
    counter += 1;



    this.setState({calculatorRepeatNumber: counter});
    this.setState({arrCalculator:[..."",<Calculator/>]})

}
 //displaying calculators
DisplayCalculators(){
        this.state.arrCalculator.map((counting)=><div>{}</div>);
}

Calculation()
{

}

  render(){

    return (

        <div className="App" >
          <Suspense fallback={<div><Skeleton count={1}  height={100} />
              <Skeleton count={1}  height={100} baseColor={"lightgray"} />
              <Skeleton circle width={60} height={60} baseColor={"lightgray"} count={1} />
              <Skeleton count={4} height={100} baseColor={"lightgray"} />
          </div>}>
              <div className={"container"}>

                      <Section bg={"white"} color={"black"} content={<img src={logo} className={"logo"} title={"BES"} alt={"BES"} />}/>
                      <Section bg={"#156982"} color={"white"} content={<h1 style={{textAlign: "center"}} >Electric Cables Cross Section Calculation</h1>}/>

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
                      <div className={"col-12"} onClick={this.OnClickCalculator.bind(this)}>
                        <Calculator   />

                      </div>
                  </div>
                  <div className={"row"}>
                      <div className={"col-12 space "}>

                          <button className={"btn-secondary-disabled total-left"} type={"button"}>Calculate</button>
                          <button className={"btn-secondary"} type={"button"}>Save</button>
                      </div>

                  </div>

              </div>
          </Suspense>
        </div>
    );

  }

}

export default App;
