import React, { Component } from "react";
import { Container, Stack, Image } from "react-bootstrap";
import LoginSignUp from "./ModalLoginSignup/LoginSignUpPopup";
import Cookies from "universal-cookie";
import axios from "axios";
import './HeaderFooter.scss'

class Header extends Component {

    state = {
        username: ""
    }

    constructor(props) {
        super(props);
        this.login_signup_ref = React.createRef();
    }

    componentDidMount() {
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
                    this.setState({ username: result.data.data.username })
                }
            })
            .catch((error) => { console.log(error) })
    }

    render() {
        return (
            <div className="header">
                <LoginSignUp ref={this.login_signup_ref} />
                <div className="logo-and-login-section">
                    <Stack direction="horizontal">
                        <div className="BES-logo">
                            <Image src={this.props.logo} />
                        </div>
                        <div className="ms-auto login-icon">
                            <Image src={this.props.login_icon} roundedCircle="true" width="50"
                                onClick={(e) => { this.login_signup_ref.current.toggle_modal() }} /> <br />
                            <span>{this.state.username != "" ? this.state.username : "Login"}</span>
                        </div>
                    </Stack>
                </div>
                <Stack className='electric-cables-title' >
                    <h1>Electric Cables Cross Section Calculations</h1>
                </Stack>
            </div>
        );
    }
}

export default Header;