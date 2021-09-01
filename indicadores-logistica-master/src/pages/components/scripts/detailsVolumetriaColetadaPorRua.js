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

    if (typeof params.coletasPorRua != "undefined") {
        params.coletasPorRua.forEach(f => {
            if (params.streetSelected == null || f.rua == params.streetSelected)
                auxList.push(f);
        });

        while (auxList.length > 0) {
            items.push(auxList.splice(0, 10));
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

    if (typeof params.coletasPorRua != "undefined" && params.coletasPorRua.length > 0) {
        maxValue = params.coletasPorRua.map(m => m.quantidadeColetada).reduce(function (a, b) {
            return Math.max(a, b);
        });
    }

    return (
        <React.Fragment>
            <div className="card-details">
                <div className="card-title-details">
                    <strong><i className="fa fa-road"></i>&emsp; Coleta por Rua</strong>
                </div>

                <div className="padding-1"></div>

                <Carousel activeIndex={activeIndex} next={next} previous={previous} interval={1000000000}>

                    <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} style={{ position: 'unset !important' }} />

                    {items.map((item) => (
                        <CarouselItem onExiting={() => setAnimating(true)} onExited={() => setAnimating(false)} key={items.indexOf(item)}>

                            <div className="row card-header-table">
                                <div className="text-center col-2 details-table-header">
                                    <strong>Rua</strong>
                                </div>
                                <div className={(item.filter(f => f.quantidadePendente).length > 0 ? "col-7" : "col-9") + " text-center details-table-header"}>
                                    <strong>Coletados</strong>
                                </div>
                                <div className="col-2 text-center details-table-header" hidden={item.filter(f => f.quantidadePendente).length == 0}>
                                    <strong className="text-warning">Pendentes</strong>
                                </div>
                            </div>

                            {item.map(i => (
                                <div className="row card-header-table" key={item.indexOf(i)}>
                                    <div className="col-2 text-center col-street-column-cod">
                                        {i.rua}
                                    </div>
                                    <div className={(i.quantidadePendente ? "col-6" : "col-8") + " text-center col-street-column-progress"}>
                                        <OverlayTrigger
                                            overlay={actionTooltip(params.streetSelected == i.rua ? "Clique para Exibir Todas as Ruas" : "Clique para Exibir Detalhes da Rua " + i.rua)}>
                                            <ProgressBar
                                                now={i.quantidadePendente ? (i.quantidadeColetada * 100) / (i.quantidadePendente + i.quantidadeColetada) : 100}
                                                id={"street" + i.rua}
                                                className="progress-padding"
                                                onClick={() => params.setStreetSelected(params.streetSelected == i.rua ? null : i.rua)}
                                            />
                                        </OverlayTrigger>
                                    </div>
                                    <div className="col-1 text-center col-street-column-value padding-1">
                                        {i.quantidadeColetada}
                                    </div>
                                    <div className="col-2 text-center col-street-column-value padding-1" hidden={!i.quantidadePendente}>
                                        <span className="text-warning">&emsp;{i.quantidadePendente}</span>
                                    </div>
                                </div>
                            ))}

                        </CarouselItem>
                    ))}

                    {params.coletasPorRua.length == 0 ?
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