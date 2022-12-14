import React, { useEffect, useRef, useState } from "react";
import { Stack, Image, OverlayTrigger, Tooltip, Button, Popover } from "react-bootstrap";
import LoginSignUp from "components/ModalLoginSignup/LoginSignUpPopup";
import axios from "axios";
import 'scss/HeaderFooter.scss'
import editIcon from 'Assets/edit_icon.svg'

export default function Header(props) {
    const [showModal, setShowModal] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);


    const popover = (
        <Popover placement="bottom" className="user-popover">
            <Popover.Body>
                <div className="poopover-content">
                    <div>
                        <a className="link" href="/dashboard">Dashboard</a>
                    </div>
                    <div>
                        <span className="email">{props.email}</span> <br />
                        <span className="edit-email-btn">
                            <img src={editIcon} /> <span style={{ "minWidth": "8px" }} />
                            <span className="edit-email">edit mail address</span>
                        </span>
                    </div>
                    <div className="reset-password">
                        <a className="link">reset password</a>
                    </div>
                    <div className="contact-us">
                        <a className="link">contact us</a>
                    </div>
                    <a className="link" onClick={_e => {
                        sessionStorage.removeItem("token")
                        window.location.reload();
                    }}>logout</a>
                </div>
            </Popover.Body>
        </Popover>
    )

    const HandleUserIconClick = function (e) {
        if (!props.username) {
            setShowModal(true);
        } else {
            setShowTooltip(!showTooltip);
        }
    }

    return (
        <div className="header">
            <LoginSignUp visible={showModal} setVisible={setShowModal} />
            <div className="logo-and-login-section">
                <Stack direction="horizontal">
                    <div className="BES-logo">
                        <Image src={props.logo} />
                    </div>

                    <div className="ms-auto login-icon">
                        <Image
                            src={props.login_icon}
                            roundedCircle="true"
                            width="50"
                            onClick={HandleUserIconClick}
                            style={{ "filter": showTooltip ? "invert(28%) sepia(93%) saturate(583%) hue-rotate(151deg) brightness(93%) contrast(84%)" : "none" }} />
                        <OverlayTrigger
                            placement={"bottom"}
                            show={showTooltip}
                            overlay={popover}>
                            <span style={{ "color": showTooltip ? "#156982" : "unset" }}>{props.username ? props.username : "Login"}</span>
                        </OverlayTrigger>
                    </div>


                </Stack>
            </div>
            <Stack className='electric-cables-title' >
                <h1>Electric Cables Cross Section Calculations</h1>
            </Stack>
        </div>
    )
}