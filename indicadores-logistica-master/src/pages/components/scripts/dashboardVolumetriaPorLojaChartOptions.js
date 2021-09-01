export const optionsConfig = (params) => {

    let result = {

        theme: {
            mode: 'dark',
            palette: 'palette1',
            fill: 'transparent'
        },

        legend: {
            show: true,
            showForSingleSeries: false,
            showForNullSeries: false,
            showForZeroSeries: false,
            position: 'bottom',
            horizontalAlign: 'center',
            floating: false,
            fontSize: '11px',
            fontFamily: 'monospace',
            fontWeight: 700,
            inverseOrder: false,
            offsetX: 0,
            offsetY: 0,
            labels: {
                useSeriesColors: false
            },
            markers: {
                width: 12,
                height: 12,
                strokeWidth: 0,
                strokeColor: '#000',
                radius: 12,
                offsetX: 0,
                offsetY: 0
            },
            itemMargin: {
                horizontal: 5,
                vertical: 0
            },
            onItemClick: {
                toggleDataSeries: true
            },
            onItemHover: {
                highlightDataSeries: true
            },
        },

        chart: {
            background: 'transparent',
            foreColor: '#fff',
            size: 20,
            height: 250,
            type: 'bar',
            dropShadow: {
                enabled: true,
                color: '#66b3ff',
                top: 5,
                left: 2,
                blur: 4,
                opacity: 0.1
            },
            toolbar: {
                show: false,
            },
            animations: {
                enabled: false,
                easing: 'linear',
                speed: 800,
                animateGradually: {
                    enabled: false,
                    delay: 150
                },
                dynamicAnimation: {
                    enabled: false,
                    speed: 50
                }
            },
            events: {
                dataPointSelection: (event, chartContext, config) => {
                    let value = {
                        categoryLabels: config.w.globals.categoryLabels[config.dataPointIndex],
                        title: config.w.config.title.text
                    };
                    params.onClickValue(value);
                }
            }

        },

        plotOptions: {
            bar: {
                horizontal: false,
                startingShape: 'flat',
                endingShape: 'rounded',
                columnWidth: '50%',
                barHeight: '100%',
                distributed: false,
                rangeBarOverlap: true,
                rangeBarGroupRows: false,
                colors: {
                    ranges: [{
                        from: 0,
                        to: 1000000000,
                        color: '#45a4ff'
                    }]
                },
                dataLabels: {
                    position: 'top',
                    maxItems: 31,
                    hideOverflowingLabels: true,
                    orientation: 'horizontal'
                }
            }

        },

        dataLabels: {
            enabled: false,
            formatter: function (val) {
                return val;
            },
            offsetY: -25,
            style: {
                fontSize: '11px',
                colors: ["#fff"]
            }
        },

        title: {
            text: params.chartTitle,
            align: 'left',
            style: {
                fontSize: '20px',
                fontWeight: 'bold',
                fontFamily: 'inherit',
                color: '#45a4ff'
            }
        },

        xaxis: {
            labels: {
                rotate: -45,
                style: {
                    fontSize: '11px',
                    fontWeight: 'bold',
                    fontFamily: 'inherit',
                    color: '#45a4ff'
                }
            },
            categories: params.categories,
            tickPlacement: 'on',
            position: 'bottom',
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            crosshairs: {
                fill: {
                    type: 'gradient',
                    gradient: {
                        colorFrom: '#45a4ff',
                        colorTo: '#BED1E6',
                        stops: [0, 100],
                        opacityFrom: 0.4,
                        opacityTo: 0.5,
                    }
                }
            },
            tooltip: {
                enabled: true,
            }
        },

        yaxis: {
            axisBorder: {
                show: true
            },
            axisTicks: {
                show: true,
            },
            labels: {
                show: true,
                formatter: function (val) {
                    return val;
                }
            }

        },

        grid: {
            borderColor: '#ffffff2b',
            row: {
                colors: ['transparent', 'transparent']
            },
        },
        markers: {
            size: 1
        }

    }

    return result;
}