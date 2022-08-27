import { React, useEffect, useState } from "react";
import 'react-loading-skeleton/dist/skeleton.css';
import CalculatorPage from 'pages/CalculatorPage';
import Header from 'components/Header';
import logo from 'Assets/logo.svg';
import login_icon from "Assets/login_icon.svg";
import { Route, Routes } from "react-router-dom"
import Footer from "components/Footer";
import Dashboard from "pages/Dashboard";
import axios from "axios";


export default function App() {

    const [loggedUser, setLoggedUser] = useState({
        email: "",
        username: "",
    })

    useEffect(() => {
        callBackendAPI();
    }, [])

    const callBackendAPI = async () => {

        // if there is no token, the user is not logged in
        if (!sessionStorage.getItem("token")) {
            return
        }

        const configs = {
            method: "GET",
            base_url: "localhost:8080",
            url: "/loggeduser",
            headers: {
                "auth": sessionStorage.getItem("token")
            }
        }
        axios(configs)
            .then((result) => {
                if (result.data.success) {
                    setLoggedUser(result.data.user)
                }
            })
            .catch((error) => { console.log(error) })

    }
    return (
        <div className='App'>
            <Header logo={logo} login_icon={login_icon} email={loggedUser.email} username={loggedUser.username} />
            <Routes>
                <Route index element={<CalculatorPage userdata={loggedUser}/>} />
                <Route path="/dashboard" element={<Dashboard userdata={loggedUser}/>} />
            </Routes>
            <Footer />
        </div>
    );
}
