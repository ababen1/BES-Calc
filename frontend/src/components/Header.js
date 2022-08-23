import React, { useEffect, useState } from "react";
import { Stack, Image, OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import LoginSignUp from "components/ModalLoginSignup/LoginSignUpPopup";
import axios from "axios";
import 'scss/HeaderFooter.scss'

export default function Header(props) {
    const [showModal, setShowModal] = useState(false);
    const [username, setUsername] = useState("");
    const [showTooltip, setShowTooltip] = useState(false);

    const HandleUserIconClick = function (e) {
        if (!username) {
            setShowModal(true);
        } else {
            setShowTooltip(!showTooltip);
        }
    }

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
    }, [])

    return (
        <div className="header">
            <LoginSignUp visible={showModal} setVisible={setShowModal} />
            <div className="logo-and-login-section">
                <Stack direction="horizontal">
                    <div className="BES-logo">
                        <Image src={props.logo} />
                    </div>

                    <div className="ms-auto login-icon">
                        <OverlayTrigger
                            placement={"bottom"}
                            show={showTooltip}
                            overlay={
                                <Tooltip>
                                    ababa
                                </Tooltip>}>
                            <Image src={props.login_icon} roundedCircle="true" width="50"
                                onClick={HandleUserIconClick} />
                        </OverlayTrigger>
                        <br />
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