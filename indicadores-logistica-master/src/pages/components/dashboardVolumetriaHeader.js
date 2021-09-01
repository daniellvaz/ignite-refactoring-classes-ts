import React from "react";
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";
import { reduceValue } from '../../utils';
import '../styles/dashboard.css';
import './styles/dashboardVolumetryHeader.css';
export default function (params) {
    const items = [
        {
            title: 'Volumes',
            value: reduceValue(params.rows.map(m => m.volumetriaAtualizavel ? 0 : m.volume)),
            variation: reduceValue(params.rows.map(m => m.reforco)),
            color: '#1d8cf8',
            colorVariation: '#7bb0ff',
            icon: 'fas fa-boxes'
        },
        {
            title: 'Finalizados',
            value: reduceValue(params.rows.map(m => m.volumetriaAtualizavel ? 0 : m.coletado)),
            color: '#20d623',
            icon: 'fas fa-check'
        },
        {
            title: 'Zerados',
            value: reduceValue(params.rows.map(m => m.volumetriaAtualizavel ? 0 : m.zerado)),
            color: '#d0d620',
            icon: 'fas fa-times'
        },
        {
            title: 'Pendentes',
            value: reduceValue(params.rows.map(m => m.volumetriaAtualizavel ? 0 : m.pendente)),
            color: '#dedede',
            icon: 'fas fa-sync-alt'
        }
        // {
        //     title: 'Colaboradores',
        //     value: params.collaborators,
        //     color: '#1d8cf8',
        //     icon: 'tim-icons header-icon icon-single-02, fas fa-forklift'
        // }
    ];

    return (
        <React.Fragment>
            <Row className="row" key={"dashHeader" + Math.random() * (1000 - 0) + 0}>
                {items.map(i => (
                    <Col key={items.indexOf(i) + Math.random() * (1000 - 0) + 0} lg="2" md="6" sm="6" style={{ color: i.color }}>
                        <Card className="card-stats header-card-bg" style={{ boxShadow: '0 0px 5px 3px ' + i.color }}>
                            <CardBody className="padding-slim">
                                <Row>
                                    <Col md="4" xs="5">
                                        <div className="icon-big text-center icon-warning header-div-icon">
                                            <i className={i.icon} />
                                        </div>
                                    </Col>
                                    <Col md="8" xs="7">
                                        <div className="numbers">
                                            <strong className="card-category header-title font-bigger" style={{ color: i.color }}>{i.title}</strong>
                                            <CardTitle tag="p" className="header-title font-bigger" style={{ color: i.color }}>
                                                {i.value}
                                                {i.variation ?
                                                    <span className="text-reforco" style={{ color: i.colorVariation, marginTop: '2%' }}>
                                                        <span className="div-text-reforco">
                                                            +{i.variation}
                                                        </span>
                                                    </span>
                                                    : ''}
                                            </CardTitle>
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                ))}

                <Col key={Math.random() * (1000 - 0) + 0} lg="2" md="6" sm="6" style={{ color: '#ff7600' }}>
                    <Card className="card-stats header-card-bg" style={{ boxShadow: '0 0px 5px 3px #ff7600' }}>
                        <CardBody className="padding-slim">
                            <div className="row">
                                <div className="col-2" />
                                <div className="col-4">
                                    <div className="icon-big text-center icon-warning header-div-icon-alternative">
                                        <i className="fas fa-user" />
                                    </div>
                                </div>
                                <div className="col-4 text-center">
                                    <div className="numbers">
                                        <CardTitle tag="p" className="header-title font-bigger-alternative" style={{ color: '#ff7600' }}>
                                            {params.collaborators}
                                        </CardTitle>
                                    </div>
                                </div>
                                <div className="col-2" />
                            </div>
                        </CardBody>
                    </Card>
                </Col>

                <Col key={Math.random() * (1000 - 0) + 0} lg="2" md="6" sm="6" style={{ color: '#ff7600' }}>
                    <Card className="card-stats header-card-bg" style={{ boxShadow: '0 0px 5px 3px #ff7600' }}>
                        <CardBody className="padding-slim">
                            <div className="row">
                                <div className="col-2" />
                                <div className="col-4">
                                    <div className="icon-big text-center icon-warning header-div-icon-alternative">
                                        <i className="fas fa-forklift" />
                                    </div>
                                </div>
                                <div className="col-4 text-center">
                                    <div className="numbers">
                                        <CardTitle tag="p" className="header-title font-bigger-alternative" style={{ color: '#ff7600' }}>
                                            {params.forklift}
                                        </CardTitle>
                                    </div>
                                </div>
                                <div className="col-2" />
                            </div>
                        </CardBody>
                    </Card>
                </Col>

            </Row>
        </React.Fragment>
    );

}