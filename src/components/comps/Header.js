import { Component } from "react";
import { Container, Stack, Image } from "react-bootstrap";


class Header extends Component {
    render() {
        return (
            <Container>
                <Stack direction="horizontal">
                    <div>
                        <Image src={this.props.logo} />
                    </div>
                    <div className="ms-auto" style={{ "text-align": "center" }}>
                        <Image src={this.props.login_icon} roundedCircle="true" width="75" /> <br /> <span>Login</span>
                    </div>
                </Stack>
                <div className={"row"}>
                    <div className={"info"} >
                        <h1>Electric Cables Cross Section Calculations</h1>
                    </div>
                </div>
            </Container>
        );
    }
}

export default Header;