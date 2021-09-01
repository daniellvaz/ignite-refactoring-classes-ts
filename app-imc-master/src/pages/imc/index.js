import React, { useState, useEffect } from "react";
import IMCPage from './imcPage';
import StepOne from './stepOne';
import StepTwo from './stepTwo';
import StepThree from './stepThree';
import ConfettiGenerator from "confetti-js";
import { hideOpenedMenu } from '../../utils';
import logoDGQ from '../../assets/img/logo_dgq.png';
import { Tooltip, OverlayTrigger, Carousel } from "react-bootstrap";
export default function DashboardImc() {
    const isMobileVersion = window.innerWidth <= 1000;
    const [index, setIndex] = useState(0);
    const [gen, setGen] = useState(null);
    const [imc, setImc] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Criado no século 19 pelo matemático Lambert Quételet, o Índice de Massa Corporal, conhecido pela sigla IMC, é um cálculo simples que permite medir se alguém está ou não com o peso ideal.
        </Tooltip>
    );

    const renderConfetti = () => {
        var confettiSettings = {
            "target": "canvas-confetti",
            "max": "400",
            "size": "1",
            "animate": true,
            "props": ["circle", "square", "line"],
            "colors": [[40, 147, 254], [108, 176, 244], [178, 216, 255]],
            "clock": "30",
            "rotate": true,
            "start_from_edge": true,
            "respawn": false
        };

        var confetti = new ConfettiGenerator(confettiSettings);
        confetti.render();
    }

    return (

        <React.Fragment>

            <br />

            <div className="header-page-title text-center">
                <h3 className="m-0">
                    <span><i className="fas fa-calculator"></i></span>
                    <span>&emsp; Calculadora IMC</span>
                </h3>
            </div>

            <canvas id="canvas-confetti" className="canvas-confetti"></canvas>

            <div id="content" className="content" onClick={hideOpenedMenu}>

                {isMobileVersion ?
                    <Carousel activeIndex={index} controls={false} indicators={false} interval={99999999999999999}>
                        <Carousel.Item>
                            <StepOne isMobileVersion={isMobileVersion} handleSelect={handleSelect} setGen={setGen} gen={gen} />
                        </Carousel.Item>
                        <Carousel.Item>
                            <StepTwo isMobileVersion={isMobileVersion} handleSelect={handleSelect} setImc={setImc} imc={imc} renderConfetti={renderConfetti} />
                        </Carousel.Item>
                        <Carousel.Item>
                            <StepThree isMobileVersion={isMobileVersion} handleSelect={handleSelect} imc={imc} />
                        </Carousel.Item>
                    </Carousel>
                    :
                    <IMCPage isMobileVersion={isMobileVersion} setGen={setGen} gen={gen} setImc={setImc} imc={imc} renderConfetti={renderConfetti} logoDGQ={logoDGQ} />
                }


                {isMobileVersion ?
                    <div className="text-center">
                        <img src={logoDGQ} alt="IMC" height="150px"></img>
                    </div>
                    : ''}


            </div>

        </React.Fragment >
    );
}