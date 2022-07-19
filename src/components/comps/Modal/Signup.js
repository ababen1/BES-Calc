import { Component } from "react";
import { FloatingLabel, Form, Container, Stack, Button } from "react-bootstrap";
import './LoginSignupModal.scss'

class Signup extends Component {
    state = {

    }

    render() {
        return (
            <Container className="signup-panel">
                <Container className="signup-title">
                    In order to save your calculations, please
                    <h2>Sign up</h2>
                </Container>
                <Form>
                    <Container className="signup-form">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Your Email"
                            className="mb-3">
                            <Form.Control type="email" placeholder="name@example.com" />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Create Username"
                            className="mb-3">
                            <Form.Control type="text" placeholder="username" />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Create Password"
                            className="mb-3">
                            <Form.Control type="password" placeholder="pass" />
                        </FloatingLabel>
                    </Container>
                    <Container className="btn-container">
                        <Button size="lg" className="signup-btn">Sign me up</Button>
                    </Container>
                </Form>

            </Container>
        )
    }

}
export default Signup;