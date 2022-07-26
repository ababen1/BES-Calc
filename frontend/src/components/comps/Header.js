import React, { Component } from "react";
import { Container, Stack, Image } from "react-bootstrap";
import LoginSignUp from "./Modal/LoginSignUpPopup";


class Header extends Component {

    state = {
        logged_user: {}
    }

    getLoggedUser() {
        fetch('http://localhost:5000/logged_user', {
            method: 'get',
            headers: {
                "content-type": "application/json",
                "accept": "application/json",
                "authorization": sessionStorage.getItem("token")
            }
        }).then(response => response.json()).then(user => {
            this.setState({logged_user: user})
        })
        .catch((err) => {
            this.setState({logged_user: {}})
        })
    }

    constructor(props) {
        super(props);
        this.login_signup_ref = React.createRef();
    }

    componentDidMount() {
        this.getLoggedUser();
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
                        <span>{(this.state.logged_user != {}) ? "Login" : this.state.logged_user.username}</span>
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