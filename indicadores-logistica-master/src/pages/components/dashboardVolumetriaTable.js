import React from "react";
import { Card, CardBody, Table, Row, Col } from "reactstrap";
import Carousel from './scripts/carouselVolumetryDetails';
import Clock from './scripts/digitalClock';

import '../styles/dashboard.css';
import './styles/dashboardVolumetryDetails.css';
export default function (params) {
    const t = { color: 'red' };
    const rows = [];

    while (params.rows.length > 0) {
        rows.push(params.rows.splice(0, 7));
    }

    return (
        <Row>
            <Col xs="12">
                <Card>
                    <CardBody style={{ minHeight: window.innerHeight * 0.7 }}>
                        <Clock />
                        <Carousel rows={rows} />
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
}