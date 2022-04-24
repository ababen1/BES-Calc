import './App.css';
import {Component, lazy, Suspense} from "react";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';
const  Section = lazy(() =>{return new Promise(resolve => {setTimeout (()=> resolve(import("./components/comps/Section")),2500)});
});

class App extends Component{


  render(){
    return (
        <div className="App">
          <Suspense fallback={<div><Skeleton count={1}  height={100} />
              <Skeleton count={1}  height={100} baseColor={"#1D5C63"} />
              <Skeleton circle width={60} height={60} baseColor={"black"} count={1} />
              <Skeleton count={4} height={100} />
          </div>}>
              <Section bg={"white"} color={"black"} content={"BDS"}/>
              <Section bg={"#1D5C63"} color={"white"} content={<h1 style={{textAlign: "center"}} >Electric Cables Cross Section Calculation</h1>}/>
              <div className={"container"}>
                  <div className={"row"}>
                      <div className={"col-12"}>

                          <h3>Auto Date</h3>

                      </div>
                  </div>

                  <div className={"row"}>
                      <div className={"col-6"}>
                            <input className={"form-control"} placeholder={"Typing Customer Name"} />
                      </div>
                      <div className={"col-6"}>
                            <input className={"form-control"} placeholder={"Typing Facility Name"} />
                      </div>

                  </div>
              <div className={"row"}>
                  <input className={"form-control"} style={{width: "100%"}} placeholder={"Remarks"} />
              </div>

              </div>
          </Suspense>
        </div>
    );

  }

}

export default App;
