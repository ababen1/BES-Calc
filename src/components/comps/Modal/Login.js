import { Component } from "react";
import { FloatingLabel, Form, Container, Stack, Button } from "react-bootstrap";

class Login extends Component {
    state = {

    }

    render() {
        return (
            <Container className="login-modal">
                <div className="login-title">
                    welcome back, please
                    <h3>Login</h3>
                </div>
                <Form>
                    <div className="email-password">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Your Email"
                            className="mb-3"
                        >
                            <Form.Control type="email" placeholder="name@example.com" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPassword" label="Password">
                            <Form.Control type="password" placeholder="Password" />
                        </FloatingLabel>
                    </div>
                    <Stack gap={2} direction="horizontal">
                        <Form.Check type="checkbox" label="Keep me logged in" />
                        <a className="ms-auto">Reset password</a>
                    </Stack>
                    <Button size="lg" className="login-btn">Log me in</Button>
                </Form>
            </Container>
        )
    }

}
export default Login;