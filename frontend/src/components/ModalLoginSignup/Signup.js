import axios from "axios";
import { Component } from "react";
import { FloatingLabel, Form, Container, Button } from "react-bootstrap";
import './LoginSignupModal.scss'

class Signup extends Component {
    state = {
        validated: false,
        username: "",
        email: "",
        password: "",
    }

    handleSubmit(event) {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            event.preventDefault();
        }
        else {
            this.setState({ validated: true },
                this.callBackendSignup());
        }
    }

    callBackendSignup() {
        const configs = {
            method: "POST",
            base_url: "localhost:8080",
            url: "/signup",
            data: {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            }
        }
        axios(configs)
        .then((result) => {console.log(result)})
        .catch((error) => {console.log(error)})
    }

    render() {
        return (
            <Container fluid className="signup-panel">
                <Container className="title">
                    In order to save your calculations, please
                    <h2>Sign up</h2>
                </Container>
                <Form validated={this.state.validated} onSubmit={this.handleSubmit.bind(this)} className="signup-form">
                    <Container>
                        <FloatingLabel
                            label="Your Email"
                            className="mb-3">
                            <Form.Control required type="email" placeholder="name@example.com"
                                value={this.state.email} onChange={(e) => { this.setState({ email: e.target.value }) }} />
                        </FloatingLabel>
                        <FloatingLabel
                            label="Create Username"
                            className="mb-3">
                            <Form.Control required type="text" placeholder="username"
                                value={this.state.username} onChange={(e) => { this.setState({ username: e.target.value }) }} />
                        </FloatingLabel>
                        <FloatingLabel
                            label="Create Password"
                            className="mb-3">
                            <Form.Control required type="password" placeholder="pass"
                                value={this.state.password} onChange={(e) => { this.setState({ password: e.target.value }) }} />
                        </FloatingLabel>
                    </Container>
                    <Button size="lg" className="signup-btn" type="submit">Sign me up</Button>
                </Form>

            </Container>
        )
    }

}
export default Signup;