import { Component } from "react";
import { FloatingLabel, Form, Container, Stack, Button } from "react-bootstrap";
import './LoginSignupModal.scss'

class Login extends Component {
    state = {
        validated: false
    }

    handleSubmit(event) {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            this.setState({validated: true});
        }
    }

    render() {
        return (
            <Container className="login-panel">
                <Container className="title">
                    welcome back, please
                    <h2>Login</h2>
                </Container>
                <Form validated={this.state.validated} onSubmit={this.handleSubmit.bind(this)} className="login-form">
                    <Container>
                        <FloatingLabel
                            label="Your Email"
                            className="mb-3"
                        >
                            <Form.Control required type="email" placeholder="name@example.com" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPassword" label="Password">
                            <Form.Control required type="password" placeholder="Password" />
                        </FloatingLabel>
                        <Stack gap={2} direction="horizontal">
                            <Form.Check className="keep-logged-in" type="checkbox" label="Keep me logged in" />
                            <Button href="#" className="ms-auto reset-password">Reset Password </Button>
                        </Stack>
                    </Container>
                    <Button size="lg" type="submit" className="login-btn">Log me in</Button>
                </Form>
            </Container>
        )
    }

}
export default Login;