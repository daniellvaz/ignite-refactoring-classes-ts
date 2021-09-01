import React from 'react';
import { Container, Col, Row, CardDeck, Card, Button } from 'react-bootstrap';

export default () => {
    return (
        <div className="corpo-da-pagina">
            <h1>Dashboard</h1>
            <Container fluid>
                <Row>
                    <Col lg={6} className="mb-3">
                        <h4 className="pl-2">Últimos Informativos</h4>
                        <a className="ver-mais-titulo-dashboard pr-2" href="#">Ver tudo</a>
                        <CardDeck className="pl-2 pr-2">
                            <Card>
                                <Card.Img variant="top" src="holder.js/100px160" />
                                <Card.Body>
                                    <Card.Title>Card title</Card.Title>
                                    <Card.Text>
                                        This is a wider card with supporting text below as a natural lead-in to
                                        additional content. This content is a little bit longer.
                                    </Card.Text>
                                    <Button variant="primary">Ver mais</Button>
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted">Last updated 3 mins ago</small>
                                </Card.Footer>
                            </Card>
                            <Card>
                                <Card.Img variant="top" src="holder.js/100px160" />
                                <Card.Body>
                                    <Card.Title>Card title</Card.Title>
                                    <Card.Text>
                                        This card has supporting text below as a natural lead-in to additional
                                        content.{' '}
                                    </Card.Text>
                                    <Button variant="primary">Ver mais</Button>
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted">Last updated 3 mins ago</small>
                                </Card.Footer>
                            </Card>
                        </CardDeck>
                    </Col>
                    <Col lg={6} className="mb-3">
                        <h4 className="pl-2">Últimos Encartes</h4>
                        <a className="ver-mais-titulo-dashboard pr-2" href="#">Ver tudo</a>
                        <CardDeck className="pl-2 pr-2">
                            <Card>
                                <Card.Img variant="top" src="holder.js/100px160" />
                                <Card.Body>
                                    <Card.Title>Card title</Card.Title>
                                    <Card.Text>
                                        This is a wider card with supporting text below as a natural lead-in to
                                        additional content. This content is a little bit longer.
                                    </Card.Text>
                                    <Button variant="primary">Ver mais</Button>
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted">Last updated 3 mins ago</small>
                                </Card.Footer>
                            </Card>
                            <Card>
                                <Card.Img variant="top" src="holder.js/100px160" />
                                <Card.Body>
                                    <Card.Title>Card title</Card.Title>
                                    <Card.Text>
                                        This card has supporting text below as a natural lead-in to additional
                                        content.{' '}
                                    </Card.Text>
                                    <Button variant="primary">Ver mais</Button>
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted">Last updated 3 mins ago</small>
                                </Card.Footer>
                            </Card>
                        </CardDeck>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6} className="mb-3">
                        <h4 className="pl-2">Casadinhas ativas</h4>
                        <a className="ver-mais-titulo-dashboard pr-2" href="#">Ver tudo</a>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
