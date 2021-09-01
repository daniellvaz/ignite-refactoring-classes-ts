import React, { useState } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Carousel, CarouselItem, CarouselIndicators } from 'reactstrap';
import '../styles/detailsVolumetryCollectedCards.css';

const DetailsTable = (params) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const items = [];
    const auxList = [];

    if (typeof params.coletasPorOperador != "undefined") {
        params.coletasPorOperador.forEach(f => auxList.push(f));
        let count = 1;
        while (auxList.length > 0) {
            let obj = auxList.splice(0, 12);
            obj.key = count;

            items.push(obj);
            count++;
        }
    }

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }

    const actionTooltip = (text) => {
        return (
            <Tooltip className="draggable-tooltip">
                <strong>{text}</strong>
            </Tooltip>
        );
    }

    var maxValue = 0;

    if (typeof params.coletasPorOperador != "undefined" && params.coletasPorOperador.length > 0) {
        maxValue = params.coletasPorOperador.map(m => m.quantidadeColetada).reduce(function (a, b) {
            return Math.max(a, b);
        });
    }

    return (
        <React.Fragment>
            <div className="card-details">
                <div className="card-title-details">
                    <strong><i className="fa fa-users"></i>&emsp; Coleta por Colaborador</strong>
                </div>

                <div className="padding-1"></div>

                <Carousel activeIndex={activeIndex} next={next} previous={previous} interval={1000000000}>

                    <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} style={{ position: 'unset !important' }} />

                    {items.map((item) => (
                        <CarouselItem onExiting={() => setAnimating(true)} onExited={() => setAnimating(false)} key={items.indexOf(item)}>
                            <div className="row card-header-table">
                                <div className="text-center col-4 details-table-header"><strong>Operador</strong></div>
                                <div className="text-center col-6 details-table-header"><strong>Coletados</strong></div>
                                <div className="text-center col-2 details-table-header padding-1"></div>
                            </div>

                            {item.map(i => (
                                <div className="row card-header-table" key={item.indexOf(i)}>
                                    <div className="col-4 td-name">{i.nomeOperador}</div>
                                    <div className="col-6 td-progress">
                                        <OverlayTrigger
                                            overlay={actionTooltip(params.operatorSelected == i.nomeOperador ? "Clique para Exibir Todas os Operadores" : "Clique para Exibir Detalhes do Operador " + i.nomeOperador)}>
                                            <ProgressBar 
                                            now={(i.quantidadeColetada * 100) / maxValue} 
                                            className="progress-padding"
                                            onClick={() => params.setOperatorSelected(params.operatorSelected == i.nomeOperador ? null : i.nomeOperador)} />
                                        </OverlayTrigger>
                                    </div>
                                    <div className="col-2 text-center col-street-column-value">
                                        {i.quantidadeColetada}
                                    </div>
                                </div>
                            ))}

                        </CarouselItem>
                    ))}

                    {params.coletasPorOperador.length == 0 ?
                        <CarouselItem onExiting={() => setAnimating(true)} onExited={() => setAnimating(false)} key={0}>
                            <div className="row">
                                <div className="text-center col-12"><strong>Nenhum Resultado Encontrado</strong></div>
                            </div>
                        </CarouselItem>
                        : ''}

                </Carousel>

            </div>
        </React.Fragment>
    );
}

export default DetailsTable;