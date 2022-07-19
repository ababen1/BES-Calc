import React, { Component } from "react";
import { Modal, Row, Col, Container } from "react-bootstrap";
import Login from "./Login";
import Signup from "./Signup";

class LoginSignUp extends Component {

    constructor(props) {
        super(props);
        this.login_ref = React.createRef();
    }

    state = {
        visible: false,
    };

    toggle_modal() {
        this.setState({ visible: !this.state.visible });
    }

    render() {
        return (
            <Modal show={this.state.visible} onHide={this.toggle_modal.bind(this)} centered dialogClassName="modal-dialog">
                <Modal.Body>
                    <Container className="login-signup-modal">
                        <Row>
                            <Col>
                                <Login ref={this.login_ref} />
                            </Col>
                            <Col>
                                <Signup />
                            </Col>
                        </Row>
                    </Container>

                </Modal.Body>
            </Modal>
        );
    }
}


export default LoginSignUp;