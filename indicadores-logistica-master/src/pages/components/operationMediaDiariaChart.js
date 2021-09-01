import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import { optionsConfig } from './scripts/operationDayAvarageChartOptions';

class OperationDayAvarageChart extends Component {
    constructor(props) {
        var categories = [];
        var values = [];
        var meta = [];

        if (typeof props.averageDayChart != "undefined") {
            props.averageDayChart.forEach(f => {
                
                let day = parseInt(f.data.substr(4, 2));
                categories.push(day);
                values.push(f.media);
                meta.push(props.metaMensal)
            })
        }

        super(props);

        this.state = {

            series: [
                {
                    name: "Meta",
                    data: meta
                },
                {
                    name: "Média Diária",
                    data: values
                }
            ],
            options: optionsConfig({ categories, monthLabel: props.monthLabel }),
        };
    }

    render() {
        return (

            <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} />
            </div>

        );
    }
}

export default OperationDayAvarageChart;