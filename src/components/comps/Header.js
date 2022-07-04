import { Component } from "react";
import { Container, Stack, Image } from "react-bootstrap";


class Header extends Component {
    render() {
        return (
            <Container className="bg-transparent">
                <Stack direction="horizontal">
                    <div>
                        <Image src={this.props.logo} />
                    </div>
                    <div className="ms-auto" style={{ "text-align": "center" }}>
                        <Image className="login-icon" src={this.props.login_icon} roundedCircle="true" width="75" /> <br /> <span>Login</span>
                    </div>
                </Stack>
                <Stack className='info menu-title' >
                    <h1>Electric Cables Cross Section Calculations</h1>
                </Stack>
            </Container>
        );
    }
}

export default Header;