import axios from 'axios';
import env from '../config';
import { Table } from "reactstrap";
import React, { useEffect } from "react";
import { callNotification, hideOpenedMenu } from '../utils';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import ModalConfirm from './components/gerarVolumetriaModalConfirm';
import './styles/generateVolumetry.css';

export function GenerateVolumetry() {
  const [rows, setRows] = React.useState([]);
  const [isGenerated, setIsGenerated] = React.useState(false);

  const getGeneratedVolumetry = () => {
    const options = {
      method: 'GET',
      url: env.URL_BASE + '/getDadosVolumetria',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    axios(options).then(response => {
      let result = response.data;

      setRows(result);
      setIsGenerated(result.length > 0);

    }).catch(() => {
      callNotification("danger", "Houve um erro ao buscar os dados");
    });
  }

  const bildWords = (str) => {
    return str ? str.toFixed(2).replace(".",",") : str
  }

  useEffect(() => {
    getGeneratedVolumetry();
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <div id="content" className="content text-center" onClick={hideOpenedMenu}>

        <button id="refresh" hidden={true} onClick={() => { getGeneratedVolumetry() }}></button>

        <div id="table-div" style={{ marginTop: '2%' }}>
          <h3>
            <b>Dados da Volumetria</b>
            <br />
            <small>{new Date().toLocaleDateString()}</small>
          </h3>

          {isGenerated ?
            <a href={window.location.origin + "/separacao/admin/dashboard-separacao"} target="_blank" class="btn btn-default">Ir para Dashboard</a>
            :
            <ModalConfirm />
          }

          <ReactHTMLTableToExcel
            buttonText={"Planilha"}
            className="btn btn-success"
            filename={"Gerar Volumetria (" + new Date().toLocaleString() + ")"}
            table="table-gerar-volumetria"
            sheet="Volumetria"

          />

        </div>

        <div id="table-div" style={{ marginTop: '5%' }}>
          <Table id="table-gerar-volumetria" className="tablesorter" responsive>
            <thead className="text-primary">
              <tr>
                <th className="text-center th-custom font-bigger">Número</th>
                <th className="text-left th-custom font-bigger">Loja</th>
                <th className="text-center th-custom font-bigger">Peso</th>
                <th className="text-center th-custom font-bigger">Cubagem</th>
                <th className="text-center th-custom font-bigger">Coleta Fracionada</th>
                <th className="text-center th-custom font-bigger">Pulmão / Doca</th>
                <th className="text-center th-custom font-bigger">Qtd. Itens</th>
                <th className="text-center th-custom font-bigger">Total de Volumes</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr id="1" key="1">
                  <th className="td-custom text-center">{r.numeroLoja}</th>
                  <th className="td-custom text-left">{r.nomeLoja}</th>
                  <th className="td-custom text-center">{bildWords(r.peso)}</th>
                  <th className="td-custom text-center">{bildWords(r.volume)}</th>
                  <th className="td-custom text-center">{bildWords(r.coletaFracionada)}</th>
                  <th className="td-custom text-center">{bildWords(r.pulmaoDoca)}</th>
                  <th className="td-custom text-center">{bildWords(r.quantidadeItens)}</th>
                  <th className="td-custom text-center">{bildWords(r.volumetria)}</th>
                </tr>
              ))
              }
              {
                rows.length == 0 ?
                  <tr>
                    <td colSpan="10">
                      <br />
                      <h4>Nenhum registro encontrado</h4>
                    </td>
                  </tr>
                  : ''
              }

            </tbody>
          </Table>
        </div>

      </div>
    </React.Fragment>
  );
}

export default GenerateVolumetry;
