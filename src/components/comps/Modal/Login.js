import { Component } from "react";
import { FloatingLabel, Form, Container, Stack, Button } from "react-bootstrap";
import './LoginSignupModal.scss'

class Login extends Component {
    state = {

    }

    render() {
        return (
            <Container className="login-panel">
                <Container className="title">
                    welcome back, please
                    <h2>Login</h2>
                </Container>
                <Form className="login-form">
                    <Container>
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
                        <Stack gap={2} direction="horizontal">
                            <Form.Check type="checkbox" label="Keep me logged in" />
                            <Button href="#" className="ms-auto">Reset Password </Button>
                        </Stack>
                    </Container>
                        <Button size="lg" className="login-btn">Log me in</Button>
                </Form>
            </Container>
        )
    }

}
export default Login;