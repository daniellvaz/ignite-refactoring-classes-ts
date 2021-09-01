import axios from 'axios';
import configs from '../config';
import React, { useEffect, useState } from "react";
import { callNotification, hideOpenedMenu } from '../utils';
import Panel from './components/scripts/controleOperacaoEmpilhadeiraPanel';
import Table from './components/scripts/controleOperacaoEmpilhadeiraTable';
import Filters from './components/scripts/controleOperacaoEmpilhadeiraFilters';
import './styles/controleOperacaoEmpilhadeira.css';
import "react-modern-calendar-datepicker/lib/DatePicker.css";

export function ControleOperacaoEmpilhadeira() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    const [items, setItems] = useState(null);
    const [foundedHours, setFoundedHours] = useState([]);

    const [dateParams, setDateParams] = useState({
        startDate: year + month.toString().padStart(2, "0") + day.toString().padStart(2, "0"),
        endDate: year + month.toString().padStart(2, "0") + day.toString().padStart(2, "0")
    });

    const handleChangeFilters = (startDate, endDate) => {
        let newFilters = {
            startDate: startDate,
            endDate: endDate
        };

        setDateParams(newFilters);
        getDataTable(newFilters);
    }

    const getDataTable = (params) => {
        const options = {
            method: 'GET',
            url: configs.URL_BASE + '/getDetalhesRessuprimento',
            headers: { 'Content-Type': 'application/json' }
        }

        options.url += '?dataInicio=' + params.startDate;
        options.url += '&dataFim=' + params.endDate;

        axios(options)
            .then(response => {
                let result = response.data;
                setItems(result);

                // Horas com Dados
                let searchHours = [];

                result.operadores.map(m => m.atividadesPorHora).forEach(f => {
                    f.map(m => m.hora).forEach(hour => {
                        if (searchHours.indexOf(hour) == -1) {
                            searchHours.push(hour);
                        }
                    })
                });
                searchHours.sort((a, b) => {
                    if (a < b)
                        return -1;
                    if (a > b)
                        return 1;
                    return 0;
                });
                searchHours.push('total');

                setFoundedHours(searchHours);

            })
            .catch(e => {
                callNotification("danger", e);
            })

    }

    useEffect(() => {
        getDataTable(dateParams);
        // eslint-disable-next-line
    }, []);

    return (
        <React.Fragment>
            <div id="content" className="content" onClick={hideOpenedMenu}>
                <h3 className="text-center"><i className="fas fa-forklift"></i> &emsp; Atividades Ressuprimento</h3>

                <div className="divider" />

                <div className="row">
                    <div className="col-5">
                        <Filters dateParams={dateParams} handleChangeFilters={handleChangeFilters} />
                    </div>
                    <div className="col-1" />
                    <div className="col-6">
                        {items ? <Panel tarefasFinalizadas={items.tarefasFinalizadas} quantidadeOperadores={items.quantidadeOperadores} /> : ''}
                    </div>
                </div>

                <div className="divider" />

                {items ? <Table items={items} foundedHours={foundedHours} /> : ''}

            </div>
        </React.Fragment>
    );
}

export default ControleOperacaoEmpilhadeira;
