import { Component, React, useEffect } from "react";
import 'react-loading-skeleton/dist/skeleton.css';
import CalculatorPage from 'pages/CalculatorPage';
import Header from 'components/Header';
import logo from 'Assets/logo.svg';
import login_icon from "Assets/login_icon.svg";
import { Switch, Route } from "react-router-dom"
import Footer from "components/Footer";


export default function App() {

    useEffect(() => {
        connectToExpress();
    }, [])

    const connectToExpress = function () {
        callBackendAPI()
            .then((res) => {
                console.log(res)
            })
            .catch((err) => console.log(err))
    }

    const callBackendAPI = async () => {
        const response = await fetch('/');
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message);
        }
        return body;
    }
    return (
        <div className='App'>
            <Header logo={logo} login_icon={login_icon} />
            <CalculatorPage />
            <Footer />
        </div>
    );
}
