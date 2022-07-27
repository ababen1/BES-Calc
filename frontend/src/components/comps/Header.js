import React, { Component } from "react";
import { Container, Stack, Image } from "react-bootstrap";
import UserContext from "../context";
import LoginSignUp from "./Modal/LoginSignUpPopup";


class Header extends Component {

    constructor(props) {
        super(props);
        this.login_signup_ref = React.createRef();
    }

    componentDidMount() {
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
                        <UserContext.Consumer>
                            {value => {
                                let text = "Login"
                                if (value & value !== "") {
                                    text = value.username
                                }
                                return <span>{text}</span>
                            }}
                        </UserContext.Consumer>
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