import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import { optionsConfig } from './scripts/dashboardVolumetriaPorLojaChartOptions';
export default function StoryChart(params) {
    let categories = [];
    let data = [];

    let filter = "";

    if(params.storeSelected) {
        filter = " - " + params.dataChart.filter(f => f.numeroLoja == params.storeSelected)[0].nomeLoja;
    }

    if (params.dataChart) {
        params.dataChart.forEach(f => {
            categories.push(f.numeroLoja.toString() + ' - ' + f.nomeLoja);
            data.push(f.volumetria);
        });
    }

    let series = [{
        name: 'Valor',
        data: data
    }];

    let options = optionsConfig({ chartTitle: 'Volumetria por Loja', onClickValue: params.onClickValue, categories });

    return (

        <div hidden={params.hidden}>
            <ReactApexChart options={options} series={series} type="bar" height={350} />
        </div>

    );
}