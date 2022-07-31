import React, { Component } from "react";
import { Container, Stack, Image } from "react-bootstrap";
import UserContext from "../context";
import LoginSignUp from "./Modal/LoginSignUpPopup";
import Cookies from "universal-cookie";
import axios from "axios";

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
                    this.setState({username: result.data.data.username})
                }
            })
            .catch((error) => { console.log(error) })
    }

    render() {
        return (
            <Container fluid className="bg-transparent">
                <LoginSignUp ref={this.login_signup_ref} />
                <Stack direction="horizontal" className="BES-header">
                    <div>
                        <Image src={this.props.logo} />
                    </div>
                    <div className="ms-auto" style={{ "textAlign": "center" }}>
                        <Image className="login-icon" src={this.props.login_icon} roundedCircle="true" width="75"
                            onClick={(e) => { this.login_signup_ref.current.toggle_modal() }} /> <br />
                        <span>{this.state.username != "" ? this.state.username : "Login"}</span>
                    </div>
                </Stack>
                <Stack fluid className='BES-header-info menu-title' >
                    <h1>Electric Cables Cross Section Calculations</h1>
                </Stack>
            </Container>
        );
    }
}

export default Header;