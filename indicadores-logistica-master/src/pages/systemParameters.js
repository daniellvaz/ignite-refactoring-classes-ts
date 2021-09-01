import axios from 'axios';
import env from '../config';
import React, { useEffect, useState } from "react";
import { callNotification, hideOpenedMenu } from '../utils';
import DraggableTable from './components/scripts/draggableTable';
import './styles/systemParameters.css';

export function SystemParameters() {
  const [lojas, setLojas] = useState([]);

  const getLojas = () => {
    setLojas([]);
    const options = {
      method: 'GET',
      url: env.URL_BASE + '/getLojas',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    axios(options).then(response => {
      setLojas(response.data);
    }).catch((e) => {
      callNotification("danger", "Houve um erro ao buscar os dados");
      console.error(e);
    });
  }

  useEffect(() => {
    getLojas();
    // eslint-disable-next-line
  }, []);


  return (
    <React.Fragment>
      <div id="content" className="content" onClick={hideOpenedMenu}>

        <div className="fixed-header-page">
          <h3 className="text-center"><i className="tim-icons icon-settings icon-size"></i> &emsp; Parâmetros do Sistema</h3>

          <div className="back-space" />

          <h4 className="parameters-title text-big">
            <span>&emsp;<i className="fa fa-clock"></i></span>
            <span>&emsp;Hora de Término da Coleta</span>
          </h4>

          <div className="back-space" />

          <div className="row card-header-store">
            <div className="col-2 text-left header-col">Sequência</div>
            <div className="col-4 text-left header-col">Descrição</div>
            <div className="col-4 text-center header-col-right">Definir Hora Fim</div>
            <div className="col-2 text-center header-col-right">Ações</div>
          </div>

        </div>

        <div className="back-space-6em" />

        <DraggableTable lojas={lojas} reload={getLojas} />
        
        <div className="back-space-6em" />

      </div>
    </React.Fragment >
  );
}

export default SystemParameters;
