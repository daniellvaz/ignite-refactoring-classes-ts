import React from 'react';
import axios from 'axios';
import env from '../../config';
import { callNotification } from '../../utils';
import { MDBCard, MDBCardBody, MDBCardFooter, MDBCardTitle, MDBCardText, MDBCol, MDBTypography } from 'mdbreact';
import '../styles/operationControl.css'

const OperationMonthAvarage = (params) => {
    const [editTarget, setEditTarget] = React.useState(false);

    const percentageDiff = () => {
        let diff = params.averageMonth - params.targetMonth;
        return ((diff * 100) / params.targetMonth).toFixed(2);
    }

    const saveTargetMonth = () => {
        let value = document.getElementById("input-target-edit").value;
        let obj = { meta: value };

        const options = {
            method: 'POST',
            url: env.URL_BASE + '/salvarMetaMensal',
            data: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        axios(options).then(() => {
            document.getElementById("refresh-content").click();
            callNotification("success", "Meta atualizada com sucesso");
            setEditTarget(false);
        }).catch(() => {
            callNotification("danger", "Houve um erro ao atualizar os dados");
        });

    }

    const diff = percentageDiff();

    return (
        <MDBCol style={{ maxWidth: "22rem" }}>
            <MDBCard className="custom-card">
                <MDBCardBody className="text-center">
                    <MDBCardTitle>Média Mensal</MDBCardTitle>

                    <h3 variant="h3" className={diff >= 0 ? 'text-success' : 'text-danger'} abbr="false">{params.averageMonth}</h3>

                    <div>

                        <div hidden={!editTarget}>
                            <div className="row">
                                <div className="col-12">
                                    <input id="input-target-edit" type="number" className="form-control text-center" placeholder={"Configurar Meta"} />
                                    <small className="text-info">Meta Atual: {params.targetMonth}</small>
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-6 text-center">
                                    <button id="save-target-edit" type="button" className="btn btn-success padding-0" tabIndex="-1" onClick={() => saveTargetMonth()}>
                                        <i className="far fa-check"></i> Salvar
                                    </button>
                                </div>
                                <div className="col-6 text-center">
                                    <button type="button" className="btn btn-default padding-0" tabIndex="-1" onClick={() => setEditTarget(false)}>
                                        Cancelar
                                    </button>
                                </div>
                            </div>

                        </div>

                        <div hidden={editTarget}>
                            <strong className="text-info">
                                <button type="button" className="btn btn-link btn-info" tabIndex="-1" onClick={() => setEditTarget(true)}>
                                    <i className="far fa-edit"></i>
                                </button>

                                <span>Meta: {params.targetMonth}</span>
                            </strong>

                            <strong className={diff >= 0 ? 'text-success' : 'text-danger'} hidden={diff == 0}>
                                <span>&emsp;&emsp;<i className="fad fa-arrow-alt-from-left" /></span>
                                <span>&emsp; {diff}%</span>
                            </strong>
                        </div>

                    </div>

                    <MDBCardFooter><strong>{params.filterMonth}</strong></MDBCardFooter>

                </MDBCardBody>
            </MDBCard>
        </MDBCol>
    )
}

export default OperationMonthAvarage;