import React, { useState } from 'react';
import { Carousel, CarouselItem, CarouselIndicators } from 'reactstrap';

const detailsVolumetrycoletasPorHora = (params) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const items = [];
    const auxList = [];

    if (typeof params.coletasPorHora != "undefined") {
        params.coletasPorHora.forEach(f => auxList.push(f));
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

    return (
        <React.Fragment>

            <div className="card-details">
                <div className="card-title-details">
                    <strong><i className="fa fa-clock"></i>&emsp; Coleta por Hora</strong>
                </div>

                <div className="padding-1"></div>

                <Carousel activeIndex={activeIndex} next={next} previous={previous} interval={1000000000}>

                    <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} key={Math.random()} style={{position: 'unset !important'}}/>

                    {items.map((item) => (
                        <CarouselItem onExiting={() => setAnimating(true)} onExited={() => setAnimating(false)} key={items.indexOf(item)}>

                            <div className="row card-header-table">
                                <div className="text-center col-3 details-table-header"><strong>Hora</strong></div>
                                <div className="text-center col-3 details-table-header"><strong>Coletados</strong></div>
                                <div className="text-center col-3 details-table-header"><strong>Operadores</strong></div>
                                <div className="text-center col-3 details-table-header"><strong>Média</strong></div>
                            </div>

                            {item.map(i => (
                                <div className="row card-header-table" key={item.indexOf(i)}>
                                    <div className="text-center col-3 details-table-body">{i.hora}</div>
                                    <div className="text-center col-3 details-table-body">{i.quantidadeColetada}</div>
                                    <div className="text-center col-3 details-table-body">{i.quantidadeOperadores}</div>
                                    <div className="text-center col-3 details-table-body padding-1">{i.media}</div>
                                </div>
                            ))}

                        </CarouselItem>
                    ))}

                    {params.coletasPorHora.length == 0 ?
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

export default detailsVolumetrycoletasPorHora;