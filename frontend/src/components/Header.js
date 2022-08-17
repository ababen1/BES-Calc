import React, { useEffect, useState } from "react";
import { Stack, Image } from "react-bootstrap";
import LoginSignUp from "./ModalLoginSignup/LoginSignUpPopup";
import axios from "axios";
import './HeaderFooter.scss'

export default function Header(props) {
    const [loginModalVisible, setLoginModalVisible] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const configs = {
            method: "GET",
            base_url: "localhost:8080",
            url: "/user",
            headers: {
                "auth": sessionStorage.getItem("token")
            }
        }
        axios(configs)
            .then((result) => {
                if (result.data.success) {
                    setUsername(result.data.data.username);
                }
            })
            .catch((error) => { console.log(error) })
    },[])

    return (
        <div className="header">
            <LoginSignUp visible={loginModalVisible} setVisible={setLoginModalVisible} />
            <div className="logo-and-login-section">
                <Stack direction="horizontal">
                    <div className="BES-logo">
                        <Image src={props.logo} />
                    </div>
                    <div className="ms-auto login-icon">
                        <Image src={props.login_icon} roundedCircle="true" width="50"
                            onClick={(e) => { setLoginModalVisible(true) }} /> <br />
                        <span>{username != "" ? username : "Login"}</span>
                    </div>
                </Stack>
            </div>
            <Stack className='electric-cables-title' >
                <h1>Electric Cables Cross Section Calculations</h1>
            </Stack>
        </div>
    )
}