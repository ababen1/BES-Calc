import axios from "axios";
import e from "cors";
import { Component, useState, useEffect } from "react";
import { FloatingLabel, Form, Container, Button } from "react-bootstrap";
import './LoginSignupModal.scss'

export default function Signup() {
    const [state, setState] = useState({
        validated: false,
        username: "",
        email: "",
        password: ""
    })


    const handleChange = function (event) {
        const id = event.target.id;
        const value = event.target.value;
        setState(prevState => ({
            ...prevState,
            [id]: value
        }));
    }

    const handleSubmit = function (event) {
        const form = e.currentTarget;
        const isValid = form.checkValidity();
        event.preventDefault();
        if (isValid) {
            setState(prevState => ({
                ...prevState,
                validated: isValid
            }));
        } else {
            e.stopPropagation();
        }
    }

    useEffect(() => {
        if (state.validated) {
            callBackendLogin();
        }
    }, [state.validated])


    const callBackendLogin = function () {

        const configs = {
            method: "POST",
            base_url: "localhost:8080",
            url: "/signup",
            data: state,
        }
        axios(configs)
            .then((result) => {
                if (result.data.success) {
                    sessionStorage.setItem("token", result.data.data.token);
                    window.location.reload();
                } else {
                    alert(result.data.error)
                }

            })
            .catch((error) => { console.log(error) })
    }
    return (
        <div className="signup-panel">
            <Container className="title">
                In order to save your calculations, please
                <h2>Sign up</h2>
            </Container>
            <Form validated={state.validated} onSubmit={handleSubmit} className="signup-form">
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
                <Button className="signup-btn" type="submit">Sign me up</Button>
            </Form>
        </div>
    )
}

