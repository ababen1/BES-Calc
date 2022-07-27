import { Component } from "react";
import { FloatingLabel, Form, Container, Stack, Button } from "react-bootstrap";
import './LoginSignupModal.scss'
import axios from "axios"
import Cookies from "universal-cookie"

const cookies = new Cookies();

class Login extends Component {
    state = {
        validated: false,
        email: "",
        password: "",
        keep_logged_in: false,
    }

    handleSubmit(event) {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        else {
            this.setState({ validated: true }, this.callBackendLogin);
        }
    }

    callBackendLogin() {
       
        const configs = {
            method: "POST",
            url: "http://localhost:5000/login",
            data: {
                email: this.state.email,
                password: this.state.password,
                keep_logged_in: this.state.keep_logged_in
            }
        }
        axios(configs)
        .then((result) => {
            cookies.set("token", result.data.token, {
                path: "/"
            })
        })
        .catch((error) => {console.log(error)})
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
                            <Form.Control required type="email" placeholder="name@example.com"
                                value={this.state.email} onChange={(e) => { this.setState({ email: e.target.value }) }} />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPassword" label="Password">
                            <Form.Control required type="password" placeholder="Password"
                                value={this.state.password} onChange={(e) => { this.setState({ password: e.target.value }) }} />
                        </FloatingLabel>
                        <Stack gap={2} direction="horizontal">
                            <Form.Check className="keep-logged-in" type="checkbox" label="Keep me logged in"
                                checked={this.state.keep_logged_in} onChange={(e) => { this.setState({ keep_logged_in: e.target.checked }) }} />
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