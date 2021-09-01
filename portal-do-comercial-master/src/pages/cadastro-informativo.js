import React from 'react';
import './cadastros.css';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

export default () => {
    return (
        <div className="corpo-da-pagina">
            <h1>Cadastrar Novo Informativo</h1>
            <Container className="bg-white rounded sombra p-3">
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Título</Form.Label>
                        <Form.Control type="text" />
                        <Form.Text className="text-muted">
                            Informe aqui o título do informativo.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Conteúdo</Form.Label>
                        <Form.Control as="textarea" rows={8} />
                        <Form.Text className="text-muted">
                            Informe aqui o conteúdo do encarte.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.File id="exampleFormControlFile1" label="Anexar arquivos" />
                    </Form.Group>
                    <Button className="btn-block" variant="primary" type="submit">
                        Publicar
                    </Button>
                </Form>
            </Container>
        </div>
    )
}
