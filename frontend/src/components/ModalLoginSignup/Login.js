import { useEffect, useState } from "react";
import { FloatingLabel, Form, Stack } from "react-bootstrap";
import 'scss/LoginSignupModal.scss'
import axios from "axios"

export default function Login() {
    const [state, setState] = useState({
        email: "",
        password: "",
        keep_logged_in: false,
    });

    const [validated, setValidated] = useState(false);

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
            setValidated(true);
        }
    }

    useEffect(() => {
        if (validated) {
            callBackendLogin();
        }
    }, [validated])

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
                    setValidated(false)
                }

            })
            .catch((error) => {
                console.log(error)
                setValidated(false)
            })
    }

    return (
        <div className="login-panel">
            <div className="title">
                <span>welcome back, please</span>
                <h2>Login</h2>
            </div>
            <Form onSubmit={handleSubmit} className="login-form">

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
                    <a href="#" className="ms-auto reset-password">Reset Password </a>
                </Stack>
                <div style={{ "flexGrow": 1 }} />
                <button type="submit" className="login-btn">Log me in</button>
            </Form>
        </div>
    )

}