import axios from "axios";
import { useState, useEffect } from "react";
import { FloatingLabel, Form, Container } from "react-bootstrap";
import 'scss/LoginSignupModal.scss'

export default function Signup() {
    const [state, setState] = useState({
        username: "",
        email: "",
        password: ""
    })

    const [validated, setValidated] = useState(false);


    const handleChange = function (event) {
        const id = event.target.id;
        const value = event.target.value;
        setState(prevState => ({
            ...prevState,
            [id]: value
        }));
    }

    const handleSubmit = function (e) {
        const form = e.currentTarget;
        const isValid = form.checkValidity();
        e.preventDefault();
        if (isValid) {
            setValidated(true);
        } else {
            e.stopPropagation();
        }
    }

    useEffect(() => {
        if (validated) {
            callBackendSignup();
        }
    }, [validated])


    const callBackendSignup = function () {

        const configs = {
            method: "POST",
            base_url: "localhost:8080",
            url: "/signup",
            data: state,

        }
        axios(configs)
            .then((result) => {
                if (result.data.success) {
                    sessionStorage.setItem("token", result.data.token);
                    window.location.reload();
                } else {
                    alert(result.data.error)
                    setValidated(false)
                }

            })
            .catch((error) => {
                console.log(error)
                alert(error.response.data.message)
                setValidated(false)
            })
    }
    return (
        <div className="signup-panel">
            <Container className="title">
                <span>In order to save your calculations, please</span>
                <h2>Sign up</h2>
            </Container>
            <Form onSubmit={handleSubmit} className="signup-form">
                <FloatingLabel label="Your Email" className="mb-3">
                    <Form.Control
                        required
                        type="email"
                        placeholder="name@example.com"
                        value={state.email}
                        id="email"
                        onChange={handleChange} />
                </FloatingLabel>
                <FloatingLabel label="Create Username" className="mb-3">
                    <Form.Control
                        required
                        type="text"
                        placeholder="username"
                        id="username"
                        value={state.username}
                        onChange={handleChange} />
                </FloatingLabel>
                <FloatingLabel label="Create Password" className="mb-3">
                    <Form.Control
                        required
                        type="password"
                        placeholder="pass"
                        id="password"
                        value={state.password}
                        onChange={handleChange} />
                </FloatingLabel>
                <div style={{ "flexGrow": 1 }} />
                <button className="signup-btn" type="submit">Sign me up</button>
            </Form>
        </div>
    )
}

