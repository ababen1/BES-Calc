import React, { Component } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import Login from "./Login";
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
            <Modal show={this.state.visible} onHide={this.toggle_modal.bind(this)} size="lg" centered>
                <Modal.Body>
                    <Row>
                        <Col>
                            <Login ref={this.login_ref}/>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        );
    }
}


export default LoginSignUp;