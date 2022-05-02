import './App.css';
import {Component, lazy, Suspense} from "react";
import LoginSignUp from "./components/comps/Modal/LoginSignUp";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';
import  logo from "./Assets/Group 35.svg";
import Section from "./components/comps/Section";
import Calculator from "./components/comps/Calculator/Calculator";
import CalculatorPage from "./components/pages/CaculatorPage/CalculatorPage";
import "./components/comps/Modal/LoginSignupModal.css";
class App extends Component{
render() {
    return(
        <div>
            <LoginSignUp />
            <CalculatorPage />

        </div>
    );
}


}

export default App;
