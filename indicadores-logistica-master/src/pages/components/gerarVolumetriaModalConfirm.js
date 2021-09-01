import React from 'react'
import axios from 'axios';
import env from '../../config';
import { callNotification } from '../../utils';
import './styles/generateVolumetryModalConfirm.css';
export default function ModalConfirm() {
    const [isLoading, setIsLoading] = React.useState(false);

    const openModal = (id) => {
        let modal = document.getElementById(id);

        modal.className = "modal fade show show-custom";
        modal.style = "display: block; padding-right: 17px;";
    }

    const closeModal = (id) => {
        let modal = document.getElementById(id);

        modal.className = "modal fade";
        modal.style = "";
    }

    const generateVolumetry = () => {
        setIsLoading(true);

        const options = {
            method: 'GET',
            url: env.URL_BASE + '/gerarVolumetria',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        axios(options).then(response => {
            let result = response.data;

            if (result.status) {
                document.getElementById("refresh").click();
                callNotification("info", "Dados gerados com sucesso");
            }
            else {
                callNotification("danger", "Houve um erro ao gerar os dados");
            }
            
            setIsLoading(false);
            closeModal("confirmModal");

        }).catch(() => {
            callNotification("danger", "Houve um erro ao gerar os dados");
        });
    }

    return (
        <React.Fragment>

            <button className="btn btn-info" onClick={() => { openModal("confirmModal") }} disabled={isLoading}>Gerar Dados</button>

            <div className="modal fade" id="confirmModal" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <strong className="text-info">Atenção!</strong>
                            <br /><br />
                            {isLoading ?
                                <strong className="tex">Processando os Dados...</strong>
                                :
                                <strong className="text-info">Deseja gerar os valores de volumetria para o dia {new Date().toLocaleDateString()}?</strong>
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-footer btn-default btn-simple" onClick={() => { closeModal("confirmModal") }}>Cancelar</button>
                            <button type="button" className="btn btn-footer btn-info" onClick={() => { generateVolumetry() }} disabled={isLoading}>Confirmar</button>
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment >
    );
}