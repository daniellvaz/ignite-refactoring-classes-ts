import axios from 'axios';
import env from '../config';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import MonthAvarage from './components/operationMediaMensal';
import DayAvarageChart from './components/operationMediaDiariaChart';
import MonthAvarageChart from './components/operationMediaMensalChart';
import { callNotification, getMonthName } from '../utils';
import './styles/operationControl.css';
export function Dashboard() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const [chartData, setChartData] = useState([]);
    const [optionsSearch, setOptionsSearch] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');

    const buildMonths = () => {
        let list = [];
        let dateToFilter = new Date();

        setSelectedOption({
            id: currentYear + currentMonth.toString().padStart(2, '0'),
            value: currentMonth,
            label: getMonthName(currentMonth) + ' ' + currentYear
        });

        for (let i = 1; i <= 12; i++) {
            let switchMonth = (dateToFilter.getMonth() + 1);

            if (switchMonth < i) {
                list.push({ id: (currentYear - 1) + i.toString().padStart(2, '0'), value: switchMonth, label: getMonthName(i) + ' ' + (currentYear - 1) });
            }
            else {
                list.push({ id: currentYear + i.toString().padStart(2, '0'), value: switchMonth, label: getMonthName(i) + ' ' + currentYear });
            }
        }

        list.sort((a, b) => {
            if (a.id > b.id)
                return -1;
            if (a.id < b.id)
                return 1;
            return 0;
        });

        return list;
    }

    const getAverageMonthData = (refreshValue) => {
        setChartData([]);

        const options = {
            method: 'GET',
            url: env.URL_BASE + '/getMediaDiariaColeta?mes=' + refreshValue ?? selectedOption,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        axios(options).then(response => {
            let result = response.data;
            setChartData(result);
        }).catch(() => {
            callNotification("danger", "Houve um erro ao atualizar os dados");
        });

    }

    const refreshData = () => {
        if (typeof selectedOption.id == "undefined")
            getAverageMonthData(currentYear + currentMonth.toString().padStart(2, '0'));
        else
            getAverageMonthData(selectedOption.id);
    }

    useEffect(() => {
        setOptionsSearch(buildMonths());
        refreshData();
        // eslint-disable-next-line
    }, []);

    return (
        <React.Fragment>
            <div id="content" className="content">
                <button id="refresh-content" type="button" onClick={refreshData} hidden={true} />

                <h3 className="text-center"><i className="tim-icons icon-chart-bar-32 icon-size" /> &emsp; Média Mensal da Coleta - Separação</h3>

                <br />

                <div className="row divider">
                    <div className="col-2">
                        <div className="row">
                            <div id="filter-drop" className="col-12">

                                <DropdownButton id="dropdown-item-button" title={selectedOption.label ?? ""}>
                                    {optionsSearch.map(m => (
                                        <Dropdown.Item key={optionsSearch.indexOf(m)} as="button" className="custom-drop-item" onClick={() => { getAverageMonthData(m.id); setSelectedOption(m); }}>{m.label}</Dropdown.Item>
                                    ))}
                                </DropdownButton>

                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <MonthAvarage targetMonth={chartData.metaMensal} averageMonth={chartData.mediaMes} filterMonth={selectedOption.label} />
                        </div>
                    </div>
                    <div className="col-10" >
                        {chartData.dadosMediaMensal ? <MonthAvarageChart averageMonthChart={chartData.dadosMediaMensal} /> : ''}
                    </div>
                </div>

                <div className="row divider">
                    <div className="col-12">
                        {chartData.dadosMediaDiario ? <DayAvarageChart monthLabel={selectedOption.label} averageDayChart={chartData.dadosMediaDiario} metaMensal={chartData.metaMensal} /> : ''}
                    </div>
                </div>

            </div>
        </React.Fragment>
    );
}

export default Dashboard;
