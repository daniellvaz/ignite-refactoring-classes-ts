import React, { useState } from 'react';
import { Table } from "reactstrap";
import { Carousel, CarouselItem, CarouselIndicators } from 'reactstrap';
import BuildStoreProgress from './buildStoreProgress';
import '../styles/carouselVolumetryDetails.css';

const CarouselVolumetryDetails = (params) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const items = [];

    params.rows.forEach(f => {
        f.key = params.rows.indexOf(f);

        items.push(f);
    })

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
        <Carousel activeIndex={activeIndex} next={next} previous={previous} interval={15000}>

            <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />

            {items.map((item) => (
                <CarouselItem onExiting={() => setAnimating(true)} onExited={() => setAnimating(false)} key={items.indexOf(item)}>
                    <Table className="tablesorter" responsive>
                        <thead className="text-primary">
                            <tr>
                                <th className="header-column font-bigger"></th>
                                <th className="text-center header-column font-bigger td-20">Volumes</th>
                                <th className="text-center header-column font-bigger td-20">Finalizados</th>
                                <th className="text-center header-column font-bigger td-20">Zerados</th>
                                <th className="text-center header-column font-bigger td-20">Pendentes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {item.map(i => (
                                <tr id={item.indexOf(i)} key={item.indexOf(i) + items.indexOf(item)}>
                                    <td className="font-bigger">
                                        <BuildStoreProgress row={i} />
                                    </td>
                                    <td className="text-center font-bigger td-20">{i.volume}
                                    {i.reforco ? 
                                     <span className='text-reforco'><div className='div-text-reforco'>+{i.reforco}</div></span>
                                    : ''}
                                    </td>
                                    <td className="text-center font-bigger td-20">{i.coletado}</td>
                                    <td className="text-center font-bigger td-20">{i.zerado}</td>
                                    <td className="text-center font-bigger td-20">{i.pendente}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </CarouselItem>
            ))}

        </Carousel>
    );
}

export default CarouselVolumetryDetails;