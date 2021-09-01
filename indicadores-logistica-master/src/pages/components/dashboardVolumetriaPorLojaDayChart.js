import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import { optionsConfig } from './scripts/dashboardVolumetriaPorLojaChartOptions';
export default function StoryDay(props) {

    const categories = [];
    const data = [];

    let filter = "";
    
    if (props.daySelected) {
        filter += ' ';
        filter += props.daySelected.substr(6,2);
        filter += '/';
        filter += props.daySelected.substr(4,2);
        filter += '/';
        filter += props.daySelected.substr(0,4);
    }

    props.dataChart.forEach(f => {
        categories.push(f.data.substr(4, 2));
        data.push(f.volumetria);
    });

    let series = [{
        name: 'Valor',
        data: data
    }];

    let options = optionsConfig({ chartTitle: 'Volumetria por Dia', categories, onClickValue: props.onClickValue })

    return (

        <div hidden={props.hidden}>
            <ReactApexChart options={options} series={series} type="bar" height={350} />
        </div>

    );
}