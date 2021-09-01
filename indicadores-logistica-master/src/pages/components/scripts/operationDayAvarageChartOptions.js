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
            showForNullSeries: true,
            showForZeroSeries: true,
            position: 'bottom',
            horizontalAlign: 'center',
            floating: false,
            fontSize: '14px',
            fontFamily: 'Helvetica, Arial',
            fontWeight: 400,
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
            height: 350,
            type: 'line',
            dropShadow: {
                enabled: true,
                color: '#66b3ff',
                top: 5,
                left: 2,
                blur: 4,
                opacity: 0.1
            },
            toolbar: {
                show: true
            }
        },
        colors: ['#fff', '#1e85f8'],
        dataLabels: {
            enabled: true,
            enabledOnSeries: [1]
        },
        stroke: {
            curve: 'smooth',
            width: [1, 9]
        },
        title: {
            text: 'Média Diária (Separação Homem Hora)',
            align: 'left',
            style: {
                fontSize: '20px',
                fontWeight: 'bold',
                fontFamily: 'inherit',
                color: '#1d8cf8'
            }
        },
        grid: {
            borderColor: 'transparent',
            row: {
                colors: ['transparent', 'transparent']
            },
        },
        markers: {
            size: 1
        },
        xaxis: {
            categories: params.categories,
            tooltip: {
                enabled: true
            }
        }


    };

    return result;
}