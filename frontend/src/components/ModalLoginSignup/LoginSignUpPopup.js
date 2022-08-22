import React, {  } from "react";
import { Modal, Row, Col, Container, CloseButton } from "react-bootstrap";
import Login from "./Login";
import Signup from "./Signup";

export default function LoginSignUp(props) {

    const OnHide = function(_event) {
        props.setVisible.call(false);
    }

    return (
        <Modal show={props.visible} onHide={OnHide} centered dialogClassName="modal-dialog">
            <Modal.Body>
                <Container fluid className="login-signup-modal">
                    <Row>
                        <Col>
                            <Login />
                        </Col>
                        <Col>
                            <Signup />
                        </Col>
                    </Row>
                    <CloseButton style={{position: "absolute", marginLeft: "21em"}} onClick={OnHide}/>
                </Container>

            </Modal.Body>
        </Modal>
    )
}
