import axios from 'axios';
import configs from '../config';
import React, { useEffect, useState } from "react";
import { callNotification, hideOpenedMenu, getMonthNumber, formatText } from '../utils';
import StoryMonthChart from './components/dashboardVolumetriaPorLojaMonthChart';
import StoryDayChart from './components/dashboardVolumetriaPorLojaDayChart';
import StoryVolumeChart from './components/dashboardVolumetriaPorLojaVolumeChart';

import "react-modern-calendar-datepicker/lib/DatePicker.css";
import './styles/dashboardStore.css';

export default function DashboardStoreVolumetry() {
    const today = new Date();
    const monthDefault = today.getFullYear().toString() + (today.getMonth() + 1).toString().padStart(2, "0");

    const [items, setItems] = useState({ dadosVolumetriaMeses: [], dadosVolumetriaLojas: [], dadosVolumetriaDias: [] });
    const [selectedItens, setSelectedItens] = useState({
        daySelected: null,
        storeSelected: null,
        monthSelected: monthDefault
    })

    const [loadComponents, setLoadComponents] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onClickValue = (param) => {
        if (param.title.indexOf('Mês') > -1) {
            let monthState = param.categoryLabels.split('-')[1].trim() + getMonthNumber(param.categoryLabels.split('-')[0].trim());
            let stateObj = {
                monthSelected: monthState,
                daySelected: null,
                storeSelected: selectedItens.storeSelected
            };

            setSelectedItens(stateObj, getVolumetryDayStore(stateObj));
        }

        else if (param.title.indexOf('Loja') > -1) {
            let storeIdState = param.categoryLabels.split('-')[0];
            let stateObj = {
                daySelected: null,
                storeSelected: parseInt(storeIdState) == selectedItens.storeSelected ? null : parseInt(storeIdState),
                monthSelected: selectedItens.monthSelected
            };

            setSelectedItens(stateObj, getVolumetryDayStore(stateObj));
        }

        else if (param.title.indexOf('Dia') > -1) {
            let dayStr = selectedItens.monthSelected + param.categoryLabels;
            let stateObj = {
                storeSelected: null,
                daySelected: dayStr == selectedItens.daySelected ? null : dayStr,
                monthSelected: selectedItens.monthSelected
            };

            setSelectedItens(stateObj, getVolumetryDayStore(stateObj));
        }

    }

    const getVolumetryDayStore = (params) => {
        setIsLoading(true);

        const options = {
            method: 'GET',
            url: configs.URL_BASE + '/getVolumetriaDiariaLojas',
            headers: { 'Content-Type': 'application/json' }
        }

        options.url += '?mes=' + (params ? params.monthSelected : selectedItens.monthSelected);

        let filterByDay = params ? params.daySelected : selectedItens.daySelected;

        if (filterByDay)
            options.url += '&data=' + filterByDay;

        let filterByStore = params ? params.storeSelected : selectedItens.storeSelected;

        if (filterByStore)
            options.url += '&numeroLoja=' + filterByStore;

        axios(options)
            .then(response => {
                let result = response.data;
                result.dadosVolumetriaLojas.forEach(f => f.nomeLoja = formatText(f.nomeLoja).replace('Republica', 'Rep. '))

                setItems(result);
                setLoadComponents(true);

                setTimeout(() => { setIsLoading(false); }, 1000);
            })
            .catch(e => {
                callNotification("danger", e);
                setLoadComponents(true);

                setTimeout(() => { setIsLoading(false); }, 1000);
            })
    }

    const loadingItens = () => {
        return (
            <h3 className="text-center loadingMessage blink" style={{ color: "#45a4f8" }}>Carregando Itens...</h3>
        );
    }

    useEffect(() => {
        getVolumetryDayStore();
        // eslint-disable-next-line
    }, []);

    return (
        <React.Fragment>
            <div id="content" className="content pace-running" onClick={hideOpenedMenu}>
                <div id="header">

                    <h3 className="text-center"><i className="tim-icons icon-paper icon-size" /> &emsp; Dashboard de Volumetria por Loja</h3>

                    <div className="row padding-left-7">
                        <h4>
                            <b style={{ color: "#45a4f8" }}>Filtros Aplicados &emsp;<i className="fa fa-long-arrow-right" aria-hidden="true"></i>&emsp;</b>
                            {
                                selectedItens.monthSelected ?
                                    <span>Mês &nbsp;
                                    {
                                            selectedItens.monthSelected.substr(4, 2) + '/' +
                                            selectedItens.monthSelected.substr(0, 4)
                                        }
                                    </span>
                                    : ''
                            }

                            {
                                selectedItens.daySelected ?
                                    <span>&emsp;<i className="fa fa-minus-square" />&emsp; Dia  &nbsp;
                                    {
                                            selectedItens.daySelected.substr(6, 2) + '/' +
                                            selectedItens.daySelected.substr(4, 2) + '/' +
                                            selectedItens.daySelected.substr(0, 4)
                                        }
                                    </span>
                                    : ''
                            }

                            {
                                selectedItens.storeSelected ?
                                    <span>&emsp;<i className="fa fa-minus-square" />&emsp; Loja  &nbsp;
                                    {
                                            items.dadosVolumetriaLojas.filter(f => f.numeroLoja == selectedItens.storeSelected)[0]?.nomeLoja
                                        }
                                    </span>
                                    : ''
                            }

                        </h4>
                    </div>

                </div>

                <div className="divider" />
                <div className="divider" />
                <div className="divider" />

                <div className="row padding-left-7" hidden={!loadComponents}>
                    <div className="width-25 text-center div-column-chart">
                        <StoryMonthChart onClickValue={onClickValue} dataChart={items.dadosVolumetriaMeses} monthSelected={selectedItens.monthSelected} hidden={isLoading} />
                        {isLoading ? loadingItens() : ''}
                    </div>
                    <div className="chart-space" />
                    <div className="width-70 text-center div-column-chart">
                        <StoryVolumeChart onClickValue={onClickValue} dataChart={items.dadosVolumetriaLojas} storeSelected={selectedItens.storeSelected} hidden={isLoading} />
                        {isLoading ? loadingItens() : ''}
                    </div>
                </div>

                <br />

                <div className="row padding-left-7" hidden={!loadComponents}>

                    <div className="width-full text-center div-column-chart">
                        <StoryDayChart onClickValue={onClickValue} dataChart={items.dadosVolumetriaDias} daySelected={selectedItens.daySelected} hidden={isLoading} />
                        {isLoading ? loadingItens() : ''}
                    </div>
                </div>

                <div className="divider" />

            </div>
        </React.Fragment>
    );
}