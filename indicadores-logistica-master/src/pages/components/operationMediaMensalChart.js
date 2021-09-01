import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import { getMonthName } from '../../utils';
import { optionsConfig } from './scripts/operationMonthAvarageChartOptions';

class OperationMonthAvarageChart extends Component {
    constructor(props) {
        var categories = [];
        var data = [];

        if(typeof props.averageMonthChart != "undefined") {
            props.averageMonthChart.forEach(f => {
                let month = parseInt(f.mes.substr(2,2));
                categories.push(getMonthName(month));
                data.push(f.media);
            })
        }

        super(props);

        this.state = {

            series: [
                {
                    name: "Média Mensal",
                    data: data
                }
            ],
            options: optionsConfig({ categories }),
        };
    }

    render() {
        return (


            <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={300} />
            </div>


        );
    }
}

export default OperationMonthAvarageChart;