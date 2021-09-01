import React from 'react';
import { Nav, Container, Row, Col } from 'react-bootstrap';
import './footer.css';
import { faCode, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer () {
    return (
        <Container fluid className="footer bg-white text-center sombra">
                    <Col>
                        <p className="pt-2 mb-1">2021 © Festval. Todos os direitos reservados.</p>
                        <Row className="d-inline-flex align-items-center pb-2">
                            <FontAwesomeIcon icon={faCode} />
                            <FontAwesomeIcon icon={faHeart} />
                            <p className="footer-copyrights-icons"><strong>DevFest</strong></p>
                        </Row>
                    </Col>
        </Container>
    )
}

export default Footer;