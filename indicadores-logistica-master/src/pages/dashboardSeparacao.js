import React, { useEffect } from "react";
import axios from 'axios';
import Header from './components/dashboardVolumetriaHeader';
import Details from './components/dashboardVolumetriaTable';
import { callNotification, hideOpenedMenu } from '../utils';
import env from '../config';
import './styles/dashboard.css';

var interval = null;
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      collaborators: 0,
      forklift: 0,
      isLoading: false
    };
  }
  reloadRows = () => {
    this.state.isLoading = true;
    const options = {
      method: 'GET',
      url: env.URL_BASE + '/getDadosColeta',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    axios(options).then(response => {
      let result = response.data;
      result.dadosColeta.forEach(r => {
        r.pendente = r.volume - r.coletado - r.zerado;
        if (r.pendente < 0) r.pendente = 0;
      });

      this.setState({
        collaborators: typeof result.coletores != "undefined" ? result.coletores : 0,
        forklift: typeof result.operadoresEmpilhadeira != "undefined" ? result.operadoresEmpilhadeira : 0,
        rows: result.dadosColeta.filter(r => r.volume + r.reforco > 0),
        isLoading: false
      });

    }).catch((e) => {
      console.log(e);
      callNotification("danger", "Houve um erro ao atualizar os dados");
    });

  }

  componentDidMount() {
    this.reloadRows();

    interval = setInterval(() => {
      let currentHour = new Date();

      if (!this.state.isLoading && (currentHour.getHours() > 6 && currentHour.getHours() < 22))
      this.reloadRows();

      if (currentHour.getHours() == 6)
        window.location.reload();

    }, 30000);

  }
  componentWillUnmount() {
    clearInterval(interval);
  }

  render() {
    return (
      <React.Fragment>
        <div id="content" className="content" onClick={hideOpenedMenu}>
          <Header rows={this.state.rows} collaborators={this.state.collaborators} forklift={this.state.forklift} />
          <div hidden={this.state.rows.length == 0}>
            <Details rows={this.state.rows} />
          </div>
          <div hidden={this.state.rows.length > 0}>
            <h1 className="loadingMessage blink">Carregando Itens...</h1>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
