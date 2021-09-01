import React, { useState } from "react";
import { getMonthName } from '../../utils';
import ReactApexChart from "react-apexcharts";
import { optionsConfig } from './scripts/dashboardVolumetriaPorLojaChartOptions';

export default function MonthChart(params) {
    var categories = [];
    var data = [];

    if (params.dataChart) {
        params.dataChart.map(m => m.volumetria).forEach((f) => {
            data.push(f);
        });

        params.dataChart.map(m => m.mes).forEach((f) => {
            categories.push(getMonthName(parseInt(f.substr(2, 2))) + ' - 20' + f.substr(0, 2))
        });
    }

    let filter = "";

    if (params.monthSelected) {
        let monthFilter = params.monthSelected.substr(4, 2);
        let yearFilter = params.monthSelected.substr(0, 4);

        filter = " - " + monthFilter + '/' + yearFilter;
    }
    let series = [{
        name: 'Valor',
        data: data
    }];

    let options = optionsConfig({
        chartTitle: 'Volumetria por Mês',
        categories: categories,
        onClickValue: params.onClickValue
    })

    return (

        <div hidden={params.hidden}>
            <ReactApexChart options={options} series={series} type="bar" height={350} />
        </div>

    );
}