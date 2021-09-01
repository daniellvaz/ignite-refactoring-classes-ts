import axios from 'axios';
import configs from '../config';
import React, { useEffect, useState } from "react";
import { callNotification, hideOpenedMenu } from '../utils';
import ColetasPorHora from './components/scripts/detailsVolumetriaColetadaPorHora';
import ChartColetasPorRua from './components/scripts/detailsVolumetriaColetadaPorRua';
import ChartColetasPorOperador from './components/scripts/detailsVolumetriaColetadaPorOperador';
import Filters from './components/scripts/productivityControlFilters';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import './styles/detailsVolumetry.css';

const defaultItems = { coletasPorHora: [], coletasPorRua: [], coletasPorOperador: [] };
export function ProductivityControlVolumetry() {
    const today = new Date();

    const [items, setItems] = useState(defaultItems);
    const [optionsSearch, setOptionsSearch] = useState([]);

    const [streetSelected, setStreetSelected] = useState(null);
    const [operatorSelected, setOperatorSelected] = useState(null);

    const getDetalhesProdutividade = (params) => {
        let startDateParam = params.startDate.year + '-' + params.startDate.month.toString().padStart(2, "0") + '-' + params.startDate.day.toString().padStart(2, "0");
        let endDateParam = params.endDate.year + '-' + params.endDate.month.toString().padStart(2, "0") + '-' + params.endDate.day.toString().padStart(2, "0");

        const options = {
            method: 'GET',
            url: configs.URL_BASE + '/getDetalhesProdutividade',
            headers: { 'Content-Type': 'application/json' }
        }

        options.url += '?dataInicio=' + startDateParam;
        options.url += '&dataFim=' + endDateParam;
        options.url += '&horaInicio=' + params.startHour;
        options.url += '&horaFim=' + params.endHour;
        options.url += '&filtroColetaFracionada=' + params.fractionalCollection;
        options.url += '&rua=' + (params.street == "Todas" ? "" : params.street);
        options.url += '&operador=' + (params.operator ?? "");
        options.url += '&filtroReservaDoca=' + params.dockReservation;
        options.url += '&filtroReservaPicking=' + params.pickingReservation;

        axios(options)
            .then(response => {
                let result = response.data;
                let streetArr = [];
                streetArr.push({ value: '', label: 'Todas' });

                result.coletasPorRua.map(m => m.rua).forEach(f => {
                    streetArr.push({ value: parseInt(f), label: f });
                })

                streetArr.sort((a, b) => {
                    if (a.value < b.value)
                        return -1;
                    if (a.value > b.value)
                        return 1;
                    return 0;
                });

                if (streetArr.length >= optionsSearch)
                    setOptionsSearch(streetArr);

                setItems(result);
            })
            .catch(e => {
                callNotification("danger", e);
            })
    }

    useEffect(() => {
        let defaultDates = {
            year: today.getFullYear(),
            month: today.getMonth() + 1,
            day: today.getDate()
        };

        let obj = {
            startHour: 6,
            endHour: 21,
            fractionalCollection: true,
            dockReservation: false,
            pickingReservation: false,
            street: '',
            startDate: defaultDates,
            endDate: defaultDates
        }

        getDetalhesProdutividade(obj);
        // eslint-disable-next-line
    }, []);

    return (
        <React.Fragment>
            <div id="content" className="content" onClick={hideOpenedMenu}>
                <h3 className="text-center"><i className="tim-icons icon-paper icon-size"></i> &emsp; Controle de Produtividade - Separação</h3>

                <br />

                <Filters
                    getDetalhesProdutividade={getDetalhesProdutividade}
                    optionsSearch={optionsSearch}
                    streetSelected={streetSelected}
                    operatorSelected={operatorSelected}
                />

                <div className="divider" />

                <div className="row">
                    <div className="col-4 text-center">
                        <ColetasPorHora
                            coletasPorHora={items.coletasPorHora}
                            streetSelected={streetSelected}
                            operatorSelected={operatorSelected}
                            setStreetSelected={setStreetSelected}
                            setOperatorSelected={setOperatorSelected}
                        />
                    </div>
                    <div className="col-4 text-center">
                        <ChartColetasPorRua
                            coletasPorRua={items.coletasPorRua}
                            streetSelected={streetSelected}
                            operatorSelected={operatorSelected}
                            setStreetSelected={setStreetSelected}
                            setOperatorSelected={setOperatorSelected}
                        />
                    </div>
                    <div className="col-4 text-center">
                        <ChartColetasPorOperador
                            coletasPorOperador={items.coletasPorOperador}
                            streetSelected={streetSelected}
                            operatorSelected={operatorSelected}
                            setStreetSelected={setStreetSelected}
                            setOperatorSelected={setOperatorSelected}
                        />
                    </div>
                </div>

            </div>
        </React.Fragment>
    );
}

export default ProductivityControlVolumetry;
