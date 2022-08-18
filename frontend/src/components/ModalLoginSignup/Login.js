import { Component, useEffect, useState } from "react";
import { FloatingLabel, Form, Container, Stack, Button } from "react-bootstrap";
import './LoginSignupModal.scss'
import axios from "axios"

export default function Login() {
    const [state, setState] = useState({
        validated: false,
        email: "",
        password: "",
        keep_logged_in: false,
    });


    const handleChange = function (e) {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }));
    }

    const handleSubmit = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        else {
            setState(prevState => ({
                ...prevState,
                "validated": e.target.checkValidity()
            }));
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
            url: "/login",
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
        <div className="login-panel">
            <div className="title">
                <span>welcome back, please</span>
                <h2>Login</h2>
            </div>
            <Form noValidate validated={state.validated} onSubmit={handleSubmit} className="login-form">

                <FloatingLabel label="Your Email" className="mb-3">
                    <Form.Control
                        required
                        type="email"
                        id="email"
                        placeholder="name@example.com"
                        value={state.email}
                        onChange={handleChange} />
                </FloatingLabel>
                <FloatingLabel label="Password">
                    <Form.Control
                        required
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={state.password}
                        onChange={handleChange} />
                </FloatingLabel>
                <Stack direction="horizontal">
                    <Form.Check
                        className="keep-logged-in"
                        type="checkbox"
                        id="keep_logged_in"
                        label="Keep me logged in"
                        checked={state.keep_logged_in}
                        onChange={(e) => { setState(prevState => ({ ...prevState, ["keep_logged_in"]: e.target.checked })) }} />
                    <button href="#" className="ms-auto reset-password">Reset Password </button>
                </Stack>
                <div style={{"flexGrow": 1}}/>
                <button type="submit" className="login-btn">Log me in</button>
            </Form>
        </div>
    )

}