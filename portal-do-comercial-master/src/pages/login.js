import React from 'react';
import './login.css';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

export default () => {
    return (
        <Container className="container-form-login">
            <Row>
                <Col lg={3} md={2} sm={12} />
                <Col lg={6} md={8} sm={12} className="sombra bg-white rounded p-3">
                    <div className="login-logo text-center mb-4">
                        <img src="http://192.168.1.217/Assets/img/logo_geral_200x50.png" />
                    </div>
                    <div className="login-nome-aplicacao text-center mb-3">
                        <h2>Portal do Comercial</h2>
                    </div>
                    <Form className="mb-3">
                        <Form.Group>
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text"></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Senha</Form.Label>
                            <Form.Control type="text"></Form.Control>
                        </Form.Group>
                        <Button className="button-festval" variant="primary" block>
                            Log In
                        </Button>
                    </Form>
                </Col>
                <Col lg={3} md={2} sm={12} />
            </Row>
        </Container>
    )
}
