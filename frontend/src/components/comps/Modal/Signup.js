import { Component } from "react";
import { FloatingLabel, Form, Container, Button } from "react-bootstrap";
import './LoginSignupModal.scss'

class Signup extends Component {
    state = {
        validated: false,
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
            <Container className="signup-panel">
                <Container className="title">
                    In order to save your calculations, please
                    <h2>Sign up</h2>
                </Container>
                <Form validated={this.state.validated} onSubmit={this.handleSubmit.bind(this)} className="signup-form">
                    <Container>
                        <FloatingLabel
                            label="Your Email"
                            className="mb-3">
                            <Form.Control required type="email" placeholder="name@example.com" />
                        </FloatingLabel>
                        <FloatingLabel
                            label="Create Username"
                            className="mb-3">
                            <Form.Control required type="text" placeholder="username" />
                        </FloatingLabel>
                        <FloatingLabel
                            label="Create Password"
                            className="mb-3">
                            <Form.Control required type="password" placeholder="pass" />
                        </FloatingLabel>
                    </Container>
                    <Button size="lg" className="signup-btn" type="submit">Sign me up</Button>
                </Form>

            </Container>
        )
    }

}
export default Signup;